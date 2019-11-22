import { Component, ViewChild, ElementRef, SimpleChange, Output, EventEmitter, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostService } from '../../app/post.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images: boolean = false;
  tag: string;
  insertCount = 0;
  @Input() text: string;
  @Output() textEmitter = new EventEmitter;
  @Input() image;
  @Output() imageEmitter = new EventEmitter;


  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase,
              public postService: PostService) {
              }
  
  ngOnInit(){

  }


  changeView(type: string) {
    if (type === 'text') {
      this.images = false;
    } else {
      this.images = true;
    }
  }

  setTag(newTag: string) {
    this.postService.setTag(newTag);
    this.text = this.postService.getCurrentText();
    this.image = this.postService.getImages();
    this.textEmitter.emit(this.text);
    this.imageEmitter.emit(this.image);
  }

  takePhoto() {
    this.postService.takePhoto().then(() => setTimeout(() => {
      this.image = this.postService.getImages();
    }, 500));
  }
}
