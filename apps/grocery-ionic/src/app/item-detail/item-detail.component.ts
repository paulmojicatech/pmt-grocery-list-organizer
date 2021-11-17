import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicAppStateService } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/ionic/ionic-app-state.service';
import { GroceryItem } from 'libs/grocery-shared-business-logic/src/lib/state/app-state.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'paulmojicatech-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item$!: Observable<GroceryItem>;

  constructor(private _ionicAppStateSvc: IonicAppStateService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = this._activatedRoute.snapshot.paramMap.get('id');
    this.item$ = this._ionicAppStateSvc.getViewModel().pipe(
      map(viewModel => {
        return viewModel.items.find(item => item.id === itemId)!;
      })
    )
  }

}
