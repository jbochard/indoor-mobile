import { Injectable } from '@angular/core';

@Injectable()
export class MobileService {
    components = [];

    saveComponents(comp:any[]) {
        this.components = comp;
    }

    loadComponents() {
        return this.components;
    }
}