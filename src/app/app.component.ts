import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { IndoorControllerPage } from '../pages/indoor-controller/indoor-controller';
import { IndoorController } from '../providers/indoor-controller'
import { IndoorDB } from '../providers/indoor-db'

import { MainPage } from '../pages/main/main';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class IonicMobile {
  @ViewChild(Nav) nav: Nav;

  rootPage = MainPage;
  controllers: Promise<Array<{name: string, ip: string}>>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public indoorController: IndoorController,
    public indoorDB: IndoorDB
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready()
      .then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();

          // set our app's pages
          this.controllers = this.indoorDB.listControllers();  
      });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(IndoorControllerPage, { controller: page });
  }
}
