import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SensorsPage } from '../sensors/sensors';
import { RulesPage } from '../rules/rules';

@Component({
  selector: 'page-indoor-controller',
  templateUrl: 'indoor-controller.html'
})
export class IndoorControllerPage {
  params: any;
  sensors;
  rules;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data.controller);
    this.params = this.navParams.data.controller;
    this.sensors = SensorsPage;
    this.rules = RulesPage;
  }
}
