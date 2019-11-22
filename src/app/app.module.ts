import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicGestureConfig, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Globalization } from "@ionic-native/globalization/ngx";
import {TranslateModule, TranslateLoader, TranslateService} from "@ngx-translate/core";
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ImagesPage } from '../pages/images/images';
import { TextsPage } from '../pages/texts/texts';
import { PostService } from './post.service';
import { FIREBASE_CONFIG } from './firebase.config';
import { DatePipe } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

export const DEFAULT_LANGUAGE = 'en-us';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImagesPage,
    TextsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostService,
    Camera,
    DatePipe,
    Globalization,
    MobileAccessibility,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
  ]
})
export class AppModule {
  constructor(platform: Platform, translate: TranslateService, public globalization: Globalization) {
    platform.ready().then(()=>{
      translate.setDefaultLang(DEFAULT_LANGUAGE);

      let browserLanguage = translate.getBrowserLang() || DEFAULT_LANGUAGE;
        translate.use(browserLanguage.toLowerCase());
/*
      if(window.cordova){
        this.globalization.getPreferredLanguage().then(result => {
          translate.use(result.value.toLowerCase());
        })
      } else {
        let browserLanguage = translate.getBrowserLang() || DEFAULT_LANGUAGE;
        translate.use(browserLanguage.toLowerCase());
      }*/
    })
    
  }







}
