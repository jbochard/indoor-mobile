import { Injectable } from "@angular/core";
import { IndoorController } from './indoor-controller';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Rules {
    lightConfig: LightConfig;
    temperatureConfig: TemperatureConfig;
    humidityConfig: HumidityConfig;
}

export class LightConfig {
    flowering: boolean;
    edit: boolean;
    lightHours: number;
    growingHours: number;
    floweringHours: number;
    lightInit: number;
    lightRelay: string;

    constructor() {
        this.flowering = false;
        this.edit = false;
        this.lightHours = 18;
        this.growingHours = 18;
        this.floweringHours = 12;
        this.lightInit = 0;
        this.lightRelay = 'Relay1';       
    }
}

export class TemperatureConfig {
    tempStart: number;
    tempRelay: string;

    constructor() {
        this.tempStart = 30;  
        this.tempRelay = 'Relay2';  
    }
}

export class HumidityConfig {
    humidityStart: number;
    humidityRelay: string;

    constructor() {
        this.humidityStart = 70;    
        this.humidityRelay = 'Relay3';
    }
}

@Injectable()
export class RuleManager {
    
    constructor(
        public http: Http,
        public indoorController: IndoorController) {
    }

    readRules(host: string): Promise<Rules> {
        return new Promise((resolve) => {
            let rules = new Rules();
            this.indoorController.readRules(host)
            .then(jsonRules => {
                jsonRules.forEach(rule => {
                    switch(rule.name) {
                        case 'lightConfig': {
                            let lc = new LightConfig();
                            lc.flowering = rule.params.lightHours == rule.params.floweringHours;
                            lc.growingHours = rule.params.growingHours;
                            lc.floweringHours = rule.params.floweringHours;
                            lc.lightInit = rule.params.lightInit;
                            lc.lightRelay = rule.params.lightRelay;
                            rules.lightConfig = lc;
                            break;
                        }
                        case 'temperatureConfig': {
                            let lc = new TemperatureConfig();
                            lc.tempStart = rule.params.tempStart;
                            rules.temperatureConfig = lc;
                            break;                       
                        }
                        case 'humidityConfig': {
                            let lc = new HumidityConfig();
                            lc.humidityStart = rule.params.humidityStart;
                            rules.humidityConfig = lc;
                            break;                       
                        }
                    }
                });
            });
            resolve(rules);
        });
    }

    writeRules(host: string, rules: Rules): Promise<any> {
        return new Promise<any>(resolve => {
            this.writeLightRule(host, rules.lightConfig)
            .then(res => {
            this.writeTemperatureRule(host, rules.temperatureConfig)
            .then(res => {
            this.writehHmidityRule(host, rules.humidityConfig)
            .then(res => {
            resolve(res);
            });
            });
            });
        });
    }

    writeLightRule(host: string, lightConfig: LightConfig): Promise<any> {
        let endHour = (lightConfig.lightInit + lightConfig.lightHours) % 24
        let rule = { 
            name: 'lightConfig', 
            params: { lightHours:lightConfig.lightHours, growingHours: lightConfig.growingHours, floweringsHours: lightConfig.floweringHours, lightInit: lightConfig.lightInit, lightRelay: lightConfig.lightRelay }, 
            rule: "if  hora_actual >= "+lightConfig.lightInit+" and hora_actual <= "+endHour+" then on("+lightConfig.lightRelay+") else off("+lightConfig.lightRelay+")" 
        };
        return new Promise<any>( resolve => {
            this.indoorController.writeRule(host, rule)
            .then(res => {
                resolve(res);
            });
        }); 
    }

    writeTemperatureRule(host: string, temperatureConfig: TemperatureConfig): Promise<any> {
        let rule = { 
            name: 'temperatureConfig', 
            params: { tempStart: temperatureConfig.tempStart }, 
            rule: "if  Temperatura >= "+temperatureConfig.tempStart+" then on("+temperatureConfig.tempRelay+") else off("+temperatureConfig.tempRelay+")" 
        };
        return new Promise<any>( resolve => {
            this.indoorController.writeRule(host, rule)
            .then(res => {
                resolve(res);
            });
        });         
    }

    writehHmidityRule(host: string, humidityConfig: HumidityConfig): Promise<any> {
        let rule = { 
            name: 'humidityConfig', 
            params: { humidityStart: humidityConfig.humidityStart }, 
            rule: "if  Humedad >= "+humidityConfig.humidityStart+" then on("+humidityConfig.humidityRelay+") else off("+humidityConfig.humidityRelay+")" 
        };
        return new Promise<any>( resolve => {
            this.indoorController.writeRule(host, rule)
            .then(res => {
                resolve(res);
            });
        });         
    }

    changeFlowering(host: string, flowering: boolean) {
        this.readRules(host)
        .then(rules => {
            if (flowering) {
                rules.lightConfig.lightHours = rules.lightConfig.floweringHours;
            } else {
                rules.lightConfig.lightHours = rules.lightConfig.growingHours;            
            }
            this.writeRules(host, rules);
        });
    }

    changeTemperature(host: string, temp: number) {
        this.readRules(host)
        .then(rules => {
            rules.temperatureConfig.tempStart = temp;            
            this.writeRules(host, rules);
        });
    }

    changeHumidity(host: string, hum: number) {
        this.readRules(host)
        .then(rules => {
            rules.humidityConfig.humidityStart = hum;            
            this.writeRules(host, rules);
        });
    }    
}