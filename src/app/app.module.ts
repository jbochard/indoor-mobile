import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicMobile } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { IndoorController } from '../providers/indoor-controller';
import { IndoorDB } from '../providers/indoor-db';

import { MainPage } from '../pages/main/main';
import { IndoorControllerPage } from '../pages/indoor-controller/indoor-controller';
import { SensorsPage } from '../pages/sensors/sensors';
import { RulesPage } from '../pages/rules/rules';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    IonicMobile,
    MainPage,
    SensorsPage,
    RulesPage,
    IndoorControllerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IonicMobile),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IonicMobile,
    MainPage,
    SensorsPage,
    RulesPage,
    IndoorControllerPage
  ],
  providers: [
    IndoorController,  
    IndoorDB,  
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
