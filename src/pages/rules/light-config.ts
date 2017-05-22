import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LightConfig, Rules, RuleManager } from '../../providers/rules';

/**
 * Generated class for the Rules page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-light-config',
  templateUrl: 'light-config.html',
})
export class LightConfigPage {

  rules: Rules;
  lightConfigPage: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ruleManager: RuleManager) { 

      this.lightConfigPage = LightConfigPage;

      this.ruleManager.readRules(this.navParams.data.ip)
      .then(rules => {
        this.rules = rules;
      });
    }

    changeFlowering() { 
      this.ruleManager.changeFlowering(this.navParams.data.ip, this.rules.lightConfig.flowering);
    }

    changeGrowingHours() {
      console.log('change');
      this.rules.lightConfig.floweringHours = 24 - this.rules.lightConfig.growingHours;
    }

    apply() {
      this.ruleManager.writeRules(this.navParams.data.ip, this.rules)
      .then( res => {
        this.navCtrl.pop();
      });
    }

    return() {
      this.navCtrl.pop();
    }
}
