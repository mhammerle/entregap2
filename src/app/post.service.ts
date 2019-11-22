import { AngularFireDatabase } from 'angularfire2/database'
import { DatePipe } from '@angular/common';

import { Injectable } from '@angular/core';
import { storage } from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class PostService {

  tag: string = 'thistagwillneverbediscovered121212';
  key: string = 'null';
  post = [];
  currentText: string = '';
  filteredTextList = [];
  photoIn = []

  constructor(private db: AngularFireDatabase,
    private camera: Camera,
    private datePipe: DatePipe) { }

  postText(newText: string) {
    console.log(this.key);
    if (this.key === 'null') {
      if (this.tag.length > 0 || this.tag === 'thistagwillneverbediscovered121212') {
        this.db.list("/texts/").push({
          tag: this.tag,
          text: newText
        });
      }
      this.filterByTag();
    } else {
      if (this.tag.length > 0) {
        this.db.object("/texts/" + this.key).update({
          text: newText
        });
      }
    }
  }

  getTexts() {
    this.db.list("/texts/").subscribe((list) => {
      this.post = list;
    });
  }

  getCurrentText() {
    return this.currentText;
  }

  filterByTag() {
    this.getTexts();
    for (let i = 0; i < this.post.length; i++) {
      if (this.post[i].tag === this.tag) {
        this.filteredTextList.push(this.post[i]);
        this.key = this.post[i].$key;
        this.currentText = this.post[i].text;
        console.log(this.key);
        break;
      } else {
        this.key = 'null';
        this.currentText = '';
        this.filteredTextList = [];
      }
    }
  }

  setTag(newTag: string) {
    this.tag = newTag;
    this.filterByTag();
  }

  async takePhoto() {
    try {

      let date = new Date();
      let dateString: string;
      dateString = this.datePipe.transform(date, 'ddMMyyyyHHmmss')

      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      const pictures = storage().ref('pictures/' + this.tag + '/' + dateString);
      this.setImageUrl(dateString);
      pictures.putString(image, 'data_url');
    } catch (e) {
      console.error("Error: " + e);
    }
  }

  setImageUrl(photoName: string) {
    let photos = [];
    if (this.key === 'null') {
      if (this.tag.length > 0 || this.tag === 'thistagwillneverbediscovered121212') {
        this.db.list("/texts/").push({
          tag: this.tag,
          text: ''
        });
      }
      this.filterByTag();
    }

    this.db.list('/texts/' + this.key + '/photos').subscribe((newPhotos) => {
      photos = newPhotos;
    })
    photos.push({
      photoName
    })
    this.db.object("/texts/" + this.key).update({
      photos
    });


  }

  removeImageUrl(photoName: string) {
    let photos = [];
    this.db.list('/texts/' + this.key + '/photos').subscribe((newPhotos) => {
      photos = newPhotos;
    })

    let index = photos.findIndex(name => name.photoName === photoName);
    photos.splice(index, 1);

    this.db.object("/texts/" + this.key).update({
      photos
    });
  }


  getImages() {
    let imageList = [];
    let imagesUrl = [];
    this.db.list('/texts/' + this.key + '/photos').subscribe((newPhotos) => {
      imageList = newPhotos
    });
    for (let i = 0; i < imageList.length; i++) {
      storage().ref('pictures/').child(this.tag + '/' + imageList[i].photoName).getDownloadURL().then((linkG) => {
        imagesUrl.push({ 'name': imageList[i].photoName, 'link': linkG });
      })
    }
    return imagesUrl;
  }

  deleteImage(name: string) {
    storage().ref('pictures/').child(this.tag + '/' + name).delete();
    this.removeImageUrl(name);
  }

}