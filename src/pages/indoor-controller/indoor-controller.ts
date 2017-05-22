import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SensorsPage } from '../sensors/sensors';
import { RulesPage } from '../rules/rules';
import { ClockPage } from '../clock/clock';

@Component({
  selector: 'page-indoor-controller',
  templateUrl: 'indoor-controller.html'
})
export class IndoorControllerPage {
  params: any;
  controller: string;
  sensors;
  rules;
  clock;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.controller = this.navParams.data.controller.name;
    this.params = this.navParams.data.controller;
    this.sensors = SensorsPage;
    this.rules = RulesPage;
    this.clock = ClockPage;
  }
}
