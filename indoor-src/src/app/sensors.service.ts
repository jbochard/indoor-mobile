import { Injectable } from '@angular/core';

@Injectable()
export class SensorsService {

    readSensors(host:string): Promise<Object> {
        return Promise.resolve(new Array());
    }
}