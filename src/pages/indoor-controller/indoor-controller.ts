import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SensorsPage } from '../sensors/sensors';
import { RulesPage } from '../rules/rules';

@Component({
  selector: 'page-indoor-controller',
  templateUrl: 'indoor-controller.html'
})
export class IndoorControllerPage {
  selectedItem: any;
  sensors;
  rules;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('controller');
    this.sensors = SensorsPage;
    this.rules = RulesPage;
  }
}
