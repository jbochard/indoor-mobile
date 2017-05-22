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

    clock;

    constructor(public http: Http) {
        this.clock = {
            year: 2017,
            month: 5,
            day: 1,
            hour: 20,
            minute: 24,
            second: 10
        };
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

    readClock(host: string): Promise<any> {
        return new Promise((resolve) => {
            this.clock.second = (this.clock.second + 1) % 60;
            resolve(this.clock);
        });
    }

    // http://192.168.1.5/hardware/clock?year=2017&month=3&day=13&hour=19
    writeClock(host: string, clock: any): Promise<any> {
        let url = "http://"+host+"/hardware/clock?year="+clock.year+"&month="+clock.month+"&day="+clock.day+"&hour="+clock.hour+"&minute="+clock.minute+"&second="+clock.second;
        console.log(url);
        return new Promise((resolve) => {
            resolve({ status: 'OK' });
        });
    }

    readRules(host: string): Promise<Array<any>> {
        let data = Array<any>();
        data.push({ name: 'lightConfig', params: { lightHours: 18, growingHours:18, floweringHours: 12, lightInit: 0, lightRelay: 'Relay1' }, rule: "if  hora_actual >= 0 and hora_actual <= 18 then on(Relay1) else off(Relay1)" });
        data.push({ name: 'temperatureConfig', params: { tempStart: 30 }, rule: "if  hora_actual >= 0 and hora_actual <= 18 then on(Relay1) else off(Relay1)" });
        data.push({ name: 'humidityConfig', params: { humidityStart: 70 }, rule: "if  hora_actual >= 0 and hora_actual <= 18 then on(Relay1) else off(Relay1)" });
        return new Promise((resolve) => {
            resolve(data);
        });
    }

    // http://192.168.1.5/rules?rule=if  hora_actual >= 0 and hora_actual <= 18 then on(Relay1) else off(Relay1)
    writeRule(host:string, rule: any): Promise<any> {
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
