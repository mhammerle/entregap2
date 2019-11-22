import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PostService } from '../../app/post.service';
import { ImageViewerController } from 'ionic-img-viewer';

/**
 * Generated class for the ImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {

  @Input() image = [];
  progress = 0;
  interval;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public postService: PostService,
              public alertControl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }


  pressed() {
    this.interval = setInterval(() => {
      this.progress = this.progress + 1;
  }, 100);
  }

  released(imageName: string) {
    clearInterval(this.interval);
    if (this.progress >= 10) {
      const alert = this.alertControl.create({
        title: "Delete?",
        message: 'Are you sure that you want to delete this image?',
        buttons: [
          {
            text: "Cancelar"
          },
          {
            text: "Yes",
            handler: () => {
              this.postService.deleteImage(imageName);
              this.image = this.postService.getImages();

            }
          }
        ]
      });
      alert.present();
    } 
    this.progress = 0;
  }

  newImage(images){
    this.image = images;
  }

}
