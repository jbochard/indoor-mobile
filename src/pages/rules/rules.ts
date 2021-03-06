import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Rules, RuleManager } from '../../providers/rules';
import { LightConfigPage } from './light-config';

/**
 * Generated class for the Rules page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {

  rules: Rules;

  lightConfigPage: any;
  lightConfigParams: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ruleManager: RuleManager) { 
      this.lightConfigPage = LightConfigPage;
      this.lightConfigParams = this.navParams.data;
      
      this.ruleManager.readRules(this.navParams.data.ip)
      .then(r => {
        this.rules = r;
      });
    }

    changeFlowering() { 
      this.ruleManager.changeFlowering(this.navParams.data.ip, this.rules.lightConfig.flowering);
    }

    changeTemperature() {
      this.ruleManager.changeTemperature(this.navParams.data.ip, this.rules.temperatureConfig.tempStart);      
    }

    changeHumidity() {
      this.ruleManager.changeHumidity(this.navParams.data.ip, this.rules.humidityConfig.humidityStart);      
    }
}
