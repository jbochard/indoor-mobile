import 'hammerjs';
import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent }     from './app.component';
import { SensorsService } from './sensors.service';
import { MobileService } from './mobile.service';
import { SensorsComponent } from './sensors.component';
import { AddComponentDlg } 	from './components/dlg_add.component';

const appRoutes: Routes = [
  { path: 'sensors', component: SensorsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SensorsComponent,
    AddComponentDlg
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [AddComponentDlg],
  providers: [ SensorsService, MobileService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
