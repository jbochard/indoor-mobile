import { Component } 		from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } 	from '@angular/material';

@Component({
  templateUrl: './dlg_add.component.html',
  styleUrls: ['./dlg_add.component.css']
})
export class AddComponentDlg {
  public data;
  
  constructor(public dialogRef: MdDialogRef<AddComponentDlg>) {
    this.data = { host: '127.0.0.0' };
  }

  addComponent() {
    this.dialogRef.close(this.data);
  }
}