import 'hammerjs';
import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent }     from './app.component';
import { AddComponentDlg } 	from './components/dlg_add.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponentDlg
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  entryComponents: [AddComponentDlg],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
