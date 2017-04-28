import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IndoorController } from "../../providers/indoor-controller";
import { Observable, Subscription } from 'rxjs/Rx';

/**
 * Generated class for the Sensors page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sensors',
  templateUrl: 'sensors.html',
})
export class SensorsPage implements OnDestroy {

  private timer;
  private sub: Subscription;

  values: Map<string, any>;
  sensors: Array<Array<any>>;
  relays: Array<Array<any>>;
  columns = 2;
  showDisabled = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public indoorController: IndoorController) {
        this.sensors = Array<Array<any>>();
        this.relays = Array<Array<any>>();
        this.values = new Map<string, any>();

        this.buildGrid(this.showDisabled);

        this.timer = Observable.timer(2000,5000);
        this.sub = this.timer.subscribe(t => this.updateSensors());
   }

   sensor_subtitle(sensor: any) {
     if (sensor.type == "DHT22_TEMP") {
       return "Temperatura (ºC)"
     }
     if (sensor.type == "DHT22_HUM") {
       return "Humedad (%)"
     }
     if (sensor.type == "SOIL_MOISTURE") {
       return "Humedad tierra (%)"
     }
  }

  private updateSensors() {
    this.indoorController
      .readSensors(this.navParams.data.ip)
      .then((data) => {
        data.forEach(d => {
          if (this.values.has(d.port+d.type)) {
            this.values.get(d.port+d.type).value = d.value;
          }
        });
    });      
  }

  private buildGrid(showDisabled: boolean) {
    this.indoorController
      .readSensors(this.navParams.data.ip)
      .then((data) => {
          let i = 0;
          let j = 0;
          let lst_sensors = Array<Array<any>>();
          let lst_relays =  Array<Array<any>>();
          let row_sensor = Array<any>();
          let row_relay = Array<any>();
          data.forEach(d => {
            if (showDisabled || (!showDisabled && d.enable)) {
              if (d.type != "RELAY") {
                if (i % this.columns == 0) {
                  row_sensor = Array<any>();
                  lst_sensors.push(row_sensor);
                }
                row_sensor.push(d);
                i = i + 1;
              } else {
                if (j % this.columns == 0) {
                  row_relay = Array<any>();
                  lst_relays.push(row_relay);
                }
                row_relay.push(d);
                j = j + 1;          
              }
              this.values.set(d.port+d.type, d);
            }
          });
          this.sensors = lst_sensors;
          this.relays = lst_relays;
      });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
