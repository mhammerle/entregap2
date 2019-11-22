import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostService } from '../../app/post.service';

/**
 * Generated class for the TextsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-texts',
  templateUrl: 'texts.html',
})
export class TextsPage {

  @Input() text;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public postService: PostService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextsPage');
  }

  postText(text: string) {
    this.postService.postText(text);
  }

  newText(text) {
      this.text = text;
  }

}
