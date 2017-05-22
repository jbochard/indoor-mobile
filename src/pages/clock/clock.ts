import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { IndoorController } from "../../providers/indoor-controller";

/**
 * Generated class for the Rules page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-clock',
  templateUrl: 'clock.html',
})
export class ClockPage implements OnDestroy {


  private timer;
  private sub: Subscription;

  clock_edit = false;
  clock = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0    
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public indoorController: IndoorController) {
      this.timer = Observable.timer(0,1000);
      this.sub = this.timer.subscribe(t => this.updateClock());
  }

  updateClock() {
    this.indoorController.readClock(this.navParams.data.ip)
    .then(data => {
      this.clock = data;
    });
  }

  edit() {
    this.clock_edit = true;
    this.sub.unsubscribe();
  }

  update() {
    this.clock_edit = false;
    this.timer = Observable.timer(0,1000);
    this.sub = this.timer.subscribe(t => this.updateClock());  
    this.indoorController.writeClock(this.navParams.data.ip, this.clock);  
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
