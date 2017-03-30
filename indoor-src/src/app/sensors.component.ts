import 'rxjs/add/operator/switchMap';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Observable } from 'rxjs/Observable';
import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SensorsService } from './sensors.service';

@Component({
  templateUrl: './sensors.component.html',
  styleUrls: [ './sensors.component.css' ]
})
export class SensorsComponent implements OnInit {

    host:string;
    sensors;
    relays;
    timer;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sensorService: SensorsService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.host = params['host'];
            let timer = TimerObservable.create(500, 5000);
            timer.subscribe(t => {
                this.update();
            });            
        });
    }

    update() {
        this.sensorService
            .readSensors(this.host)
            .then(result => {
                this.sensors = [];
                this.relays = []; 
                for (let s in result) {
                    if (result[s].type == 'RELAY') {
                        this.relays.push(result[s]);
                    } else {
                        this.sensors.push(result[s]);
                    }
                }
            });
    }

    enable(type, idx) {
        if (type == 'SENSOR') {
            this.sensors[idx].enable = !this.sensors[idx].enable;
            console.log(this.sensors[idx]);
        }
        if (type == 'RELAY') {
            this.relays[idx].enable = !this.relays[idx].enable;
        }
        this.sensorService.enableSensor(this.sensors[idx]);
    }

    manual(idx) {
        this.relays[idx].manual = !this.relays[idx].manual;
        this.sensorService.manualSensor(this.relays[idx]);
    }
}
