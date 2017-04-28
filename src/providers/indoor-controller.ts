import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IndoorController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IndoorController {

  constructor(public http: Http) {
  }

  readSensors(host: string): Promise<Array<any>> {
      let data = Array<any>();
      data.push({
                "name": "Temperatura",
                "type": "DHT22_TEMP",
                "port": 2,
                "enable": false,
                "manual": false,
                "value": 27
            });
      data.push({
                "name": "Humedad",
                "type": "DHT22_HUM",
                "port": 2,
                "enable": false,
                "manual": false,
                "value": 65
            });
      data.push({
                "name": "Relay1",
                "type": "RELAY",
                "port": 14,
                "enable": false,
                "manual": false,
                "value": 0
            });
      data.push({
                "name": "Relay2",
                "type": "RELAY",
                "port": 12,
                "enable": false,
                "manual": false,
                "value": 0
            });
      data.push({
                "name": "Relay3",
                "type": "RELAY",
                "port": 13,
                "enable": false,
                "manual": false,
                "value": 0
            });
      data.push({
                "name": "Relay4",
                "type": "RELAY",
                "port": 15,
                "enable": false,
                "manual": false,
                "value": 0
            });
      data.push({
                "name": "SoilMoisture1",
                "type": "SOIL_MOISTURE",
                "port": 16,
                "enable": false,
                "manual": false,
                "value": 0
            });
      return new Promise((resolve, reject) => {
        resolve(data);
      });
  }
}
