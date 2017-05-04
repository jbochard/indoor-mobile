import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the IndoorDB provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IndoorDB {
    private ready: boolean = false;

    constructor(public storage: Storage) {
    }

    private readyStorage(): Promise<any> {
        return new Promise((resolve) => {
            if (!this.ready) {
                this.storage.ready()
                    .then(() => {
                        this.storage.get('indoors')
                            .then((val) => {
                                if (val == undefined) {
                                    this.storage.set('indoors', Array<any>());
                                }
                                this.ready = true;
                                resolve({ ready: true });
                            })
                            .catch((res) => {
                                this.ready = false;
                                resolve({ ready: false, error: res });
                            });
                    })
                    .catch((res) => {
                        this.ready = false;
                        resolve({ ready: false, error: res });
                    });
            } else {
                resolve({ ready: true });
            }
        });
    }

    listControllers(): Promise<{ data: Array<any>, error: any }> {
        return new Promise((resolve) => {
            this.readyStorage()
            .then((status) => {
                if (status.ready) {
                    this.storage.get('indoors')
                    .then((data) => {
                        resolve({ data: data as Array<any> });       
                    })
                    .catch((res) => {
                        resolve({ data: Array<any>(), error: res.error });
                        });
                } else {
                    resolve({ data: Array<any>(), error: status.error });
                }
            });
        });
    }

    addController(name: string, ip: string): Promise<any> {
        return new Promise((resolve) => {
            this.readyStorage()
            .then((status) => {
                this.storage.get('indoors')
                .then((data) => {
                    let indoors = data as Array<any>;
                    if (indoors.find(d => d.ip == ip) == undefined) {
                        indoors.push({ name: name, ip: ip });
                        this.storage.set('indoors', indoors)
                            .then(res => { 
                                resolve({ status: 'OK' }); 
                            })
                            .catch((res) => {
                                resolve({ status: 'ERROR' });
                            });
                    } else {
                        resolve({ status: 'OK' });
                    }
                })
                .catch((res) => {
                    resolve({ status: 'ERROR' });
                });
            });
        });
    }

    removeController(ip: string): Promise < any > {
        return new Promise((resolve) => {
           this.readyStorage()
            .then((status) => {
                this.storage.get('indoors')
                .then((data) => {
                    let new_data = data.filter(d => d.ip != ip);
                    this.storage.set('indoors', new_data);
                    resolve({ status: 'OK' });
                })
                .catch((res) => {
                    resolve({ status: 'ERROR' });
                });
            });
        });
    }
}
