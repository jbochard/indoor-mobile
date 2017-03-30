import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } 		          from '@angular/platform-browser';
import { MdIconRegistry, MdDialog } 	from '@angular/material';
import { AddComponentDlg } 	from './components/dlg_add.component';
import { MobileService } 	from './mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  components = [ ];

  constructor(
      public dialog: MdDialog, 
      private mobileService: MobileService,
      private route: ActivatedRoute,
      private router: Router,
      iconRegistry: MdIconRegistry, 
      sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_apps_white_18px.svg'));
    iconRegistry.addSvgIcon('add',  sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_add_black_18px.svg'));
    iconRegistry.addSvgIcon('hand',  sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_pan_tool_black_18px.svg'));
    iconRegistry.addSvgIcon('memory',  sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_memory_black_18px.svg'));
    iconRegistry.addSvgIcon('syncOn',  sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_sync_black_18px.svg'));
    iconRegistry.addSvgIcon('syncOff',  sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_sync_disabled_black_18px.svg'));
  }

  ngOnInit() {
    this.components = this.mobileService.loadComponents();
  }

  add_component() {
    let add_component_dlg = this.dialog.open(AddComponentDlg);
    add_component_dlg.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.components.push(result);
        this.mobileService.saveComponents(this.components);
         this.router.navigate(['/sensors', { host: result.host }]);
      }
    });
  }
}
