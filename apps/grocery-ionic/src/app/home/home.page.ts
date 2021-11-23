import { Component, OnInit } from '@angular/core';
import { AppViewModel } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/app-state.interface';
import { IonicAppStateService } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/ionic/ionic-app-state.service';
import { Observable } from 'rxjs';

@Component({
  styleUrls: ['./home.page.scss'],
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  viewModel$!: Observable<AppViewModel>;

  constructor(public stateSvc: IonicAppStateService){}

  ngOnInit(): void {
    this.viewModel$ = this.stateSvc.getViewModel();
  }
}
