import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextsPage } from './texts';

@NgModule({
  declarations: [
    TextsPage,
  ],
  imports: [
    IonicPageModule.forChild(TextsPage),
  ],
})
export class TextsPageModule {}
