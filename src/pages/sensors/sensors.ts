import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IndoorController } from "../../providers/indoor-controller";

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
export class SensorsPage {

  sensors: Array<Array<any>>;
  relays: Array<Array<any>>;
  columns = 2;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public indoorController: IndoorController) {
        this.sensors = Array<Array<any>>();
        this.relays = Array<Array<any>>();

        this.indoorController
          .readSensors(this.navParams.data.ip)
          .then((result) => this.buildSensors(result));
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

   private buildSensors(data: Array<any>) {
      let i = 0;
      let j = 0;
      let row_sensor = Array<any>();
      let row_relay = Array<any>();
      data.forEach(d => {
        if (d.type != "RELAY") {
          if (i % this.columns == 0) {
            row_sensor = Array<any>();
            this.sensors.push(row_sensor);
          }
          row_sensor.push(d);
          i = i + 1;
        } else {
          if (j % this.columns == 0) {
            row_relay = Array<any>();
            this.relays.push(row_relay);
          }
          row_relay.push(d);
          j = j + 1;          
        }
      });
   }
}
