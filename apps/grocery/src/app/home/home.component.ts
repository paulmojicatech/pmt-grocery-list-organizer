import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { AppViewModel } from '../../../../../libs/grocery-shared-business-logic/src/lib/app-view-model/app-state.interface';
import { WebAppStateService } from '../../../../../libs/grocery-shared-business-logic/src/lib/app-view-model/web/web-app-state.service';
@Component({
  selector: 'paulmojicatech-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  viewModel$!: Observable<AppViewModel>;
  constructor(public webStateServce: WebAppStateService) {}

  ngOnInit(): void {
    this.viewModel$ = this.webStateServce.getViewModel().pipe(
      filter(vm => !!vm.headerData)
    );
  }
}
