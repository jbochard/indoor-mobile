import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SensorsService } from './sensors.service';

@Component({
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

    private host:string;
    private sensors;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private heroService: SensorsService
    ) { }

    ngOnInit() {
        this.route.params.switchMap((params: Params) => {
            this.host = params['host'];
            console.log(this.host);
            this.heroService
                .readSensors(this.host)
                .then(result => this.sensors = result);
            return this.host;
        });
    }
}
