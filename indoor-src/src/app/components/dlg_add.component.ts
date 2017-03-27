import { Component } 		from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } 	from '@angular/material';

@Component({
  templateUrl: './dlg_add.component.html',
})
export class AddComponentDlg {
  public host:string;
  
  constructor(public dialogRef: MdDialogRef<AddComponentDlg>) {
  }

  addComponent() {

  }
}