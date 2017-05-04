import { Component, ViewChild } from '@angular/core';

import { AlertController, Platform, MenuController, Nav } from 'ionic-angular';

import { IndoorControllerPage } from '../pages/indoor-controller/indoor-controller';
import { IndoorController } from '../providers/indoor-controller'
import { IndoorDB } from '../providers/indoor-db'

import { MainPage } from '../pages/main/main';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class IonicMobile {
  @ViewChild(Nav) nav: Nav;

  rootPage = MainPage;
  controllers: Array<any>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
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
        this.indoorDB.listControllers()
          .then(result => {
            this.controllers = result.data;
          });
      });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(IndoorControllerPage, { controller: page });
  }

  addPage() {
    this.addAlert()
      .then(result => {
        if (!result.cancel) {
          this.indoorDB.addController(result.name, result.ip)
            .then(() => {
              this.indoorDB.listControllers()
                .then(data => {
                  this.controllers = data.data;
                  this.openPage({ name: result.name, ip: result.ip});
                });
            });
        }
      });
  }

  removePage(page) {
    this.removeAlert(page.name)
      .then(isOk => {
        if (isOk) {
          let activePage = (this.nav.getActive().data.controller != undefined) ? this.nav.getActive().data.controller : {};
          this.indoorDB.removeController(page.ip)
            .then(() => {
              this.indoorDB.listControllers()
                .then(result => {
                  this.controllers = result.data;
                });
              if (activePage.ip != undefined && activePage.ip == page.ip) {
                this.nav.setRoot(MainPage);
              }
              this.menu.close();
            });
        }
      })
  }

  private addAlert(): Promise<{ cancel: boolean, name: string, ip: string }> {
    return new Promise<{ cancel: boolean, name: string, ip: string }>(resolve => {
      let prompt = this.alertCtrl.create({
        title: 'Agregar controller',
        message: "Ingrese nombre e ip del nuevo controlador de indoor.",
        inputs: [
          {
            name: 'nombre',
            placeholder: 'Nombre'
          },
          {
            name: 'ip',
            placeholder: 'Ip'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              resolve({ cancel: true, name: '', ip: '' });
            }
          },
          {
            text: 'Guardar',
            handler: data => {
              resolve({ cancel: false, name: data.nombre, ip: data.ip });
            }
          }
        ]
      });
      prompt.present();
    });
  }

  private removeAlert(name: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let alert = this.alertCtrl.create({
        title: 'Atención!',
        subTitle: 'Esta seguro que desea eliminar el controlador ' + name + ' ?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Si',
            handler: () => {
              resolve(true);
            }
          }]
      });
      alert.present();
    });
  }
}
