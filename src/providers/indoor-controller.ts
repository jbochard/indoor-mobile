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
            "enable": true,
            "manual": false,
            "value": this.getRandomInt(20, 30)
        });
        data.push({
            "name": "Humedad",
            "type": "DHT22_HUM",
            "port": 2,
            "enable": true,
            "manual": false,
            "value": this.getRandomInt(60, 70)
        });
        data.push({
            "name": "Relay1",
            "type": "RELAY",
            "port": 14,
            "enable": true,
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
            "enable": true,
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
    
    sensorEnable(sensor: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ status: 'OK' })
        });
    }

    relayValue(relay: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ status: 'OK' })
        });
    }

    relayManual(relay: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ status: 'OK' })
        });
    }

    readClock(host: string): Promise<Array<any>> {
        let data = Array<any>();
        data.push({
            "year": 2017,
            "month": 5,
            "day": 1,
            "hour": 10,
            "minute": 21,
            "second": 10
        });
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }

    // http://192.168.1.5/hardware/clock?year=2017&month=3&day=13&hour=19
    writeClock(host: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ status: 'OK' });
        });
    }

    readRules(host: string): Promise<Array<any>> {
        let data = Array<any>();
        data.push("if Temperatura >= 20 then on(Relay1)");
        data.push("if  hora_actual >= 0 and hora_actual <= 18 then on(Relay1) else off(Relay1)");  
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }

    // http://192.168.1.5/rules?rule=if  hora_actual >= 0 and hora_actual <= 18 then on(Relay1) else off(Relay1)
    writeRule(host:string, rule: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ status: 'OK' });
        });
    }

    // http://192.168.1.5/rules?idx=1
    deleteRule(host:string, idx: number): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ status: 'OK' });
        });
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
