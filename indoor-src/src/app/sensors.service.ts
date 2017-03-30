import { Injectable } from '@angular/core';

@Injectable()
export class SensorsService {

    readSensors(host:string): Promise<Object> {
        var tmp = [
            {
                "name": "Temperatura",
                "type": "DHT22_TEMP",
                "port": 2,
                "enable": false,
                "manual": false,
                "value": 27
            },
            {
                "name": "Humedad",
                "type": "DHT22_HUM",
                "port": 2,
                "enable": false,
                "manual": false,
                "value": 65
            },
            {
                "name": "Relay1",
                "type": "RELAY",
                "port": 14,
                "enable": false,
                "manual": false,
                "value": 0
            },
            {
                "name": "Relay2",
                "type": "RELAY",
                "port": 12,
                "enable": false,
                "manual": false,
                "value": 0
            },
            {
                "name": "Relay3",
                "type": "RELAY",
                "port": 13,
                "enable": false,
                "manual": false,
                "value": 0
            },
            {
                "name": "Relay4",
                "type": "RELAY",
                "port": 15,
                "enable": false,
                "manual": false,
                "value": 0
            },
            {
                "name": "SoilMoisture1",
                "type": "SOIL_MOISTURE",
                "port": 16,
                "enable": false,
                "manual": false,
                "value": 0
            }
        ];
        return Promise.resolve(tmp);
    }

    enableSensor(value) {

    }

    manualSensor(value) {
        
    }
}