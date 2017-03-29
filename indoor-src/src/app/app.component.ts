import { Component } 		              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } 		          from '@angular/platform-browser';
import { MdIconRegistry, MdDialog } 	from '@angular/material';
import { AddComponentDlg } 	from './components/dlg_add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  components = [ ];

  constructor(
      public dialog: MdDialog, 
      private route: ActivatedRoute,
      private router: Router,
      iconRegistry: MdIconRegistry, 
      sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_apps_white_18px.svg'));
    iconRegistry.addSvgIcon('add',  sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_add_black_18px.svg'));
  }

  add_component() {
    let add_component_dlg = this.dialog.open(AddComponentDlg);
    add_component_dlg.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.components.push(result);
         this.router.navigate(['/sensors', { host: result.host }]);
      }
    });
  }
}
