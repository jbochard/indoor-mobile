import { Component } 		from '@angular/core';
import { MdDialog, MdDialogRef } 	from '@angular/material';

@Component({
  templateUrl: './dlg_add.component.html',
})
export class AddComponentDlg {
  constructor(public dialogRef: MdDialogRef<AddComponentDlg>) {}
}