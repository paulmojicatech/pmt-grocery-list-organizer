import { Component, OnInit } from '@angular/core';
import { IonicHeaderDataService } from '../../../../libs/grocery-shared-business-logic/src/lib/header-data/ionic/ionic-header-data.service';
@Component({
  selector: 'paulmojicatech-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public headerUtilSvc: IonicHeaderDataService){}

  ngOnInit(): void {
    
  }
}
