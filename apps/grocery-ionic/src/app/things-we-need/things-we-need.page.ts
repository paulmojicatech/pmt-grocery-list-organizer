import { Component, OnInit } from '@angular/core';
import { AppViewModel } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/app-state.interface';
import { IonicAppStateService } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/ionic/ionic-app-state.service';
import { GroceryItem } from 'libs/grocery-shared-business-logic/src/lib/state/app-state.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'paulmojicatech-things-we-need',
  templateUrl: './things-we-need.page.html',
  styleUrls: ['./things-we-need.page.scss']
})
export class ThingsWeNeedPage implements OnInit {

  items$!: Observable<GroceryItem[]>;

  constructor(private _appViewModelSvc: IonicAppStateService) { }

  ngOnInit(): void {
    this.items$ = this._appViewModelSvc.getViewModel().pipe(
      map(viewModel => {
        return viewModel.items.filter(item => !!item.qty)
      })
    );
  }

}
