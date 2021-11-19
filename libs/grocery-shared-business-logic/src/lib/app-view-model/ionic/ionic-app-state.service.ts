import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { homeHeaderData } from '../../header-data/header-data-actions/header-data-actions';
import { IonicHeaderDataService } from '../../header-data/ionic/ionic-header-data.service';
import { SetHeader } from '../../state/actions/app.actions';
import {
  AppState,
  GroceryItem,
  HeaderButtonPosition,
} from '../../state/app-state.interface';
import { IonicStorageUtilService } from '../../storage/ionic/ionic-storage-util.service';
import { AppViewModel, IAppStateService } from '../app-state.interface';
import { AppStateService } from '../app-state.service';

@Injectable({
  providedIn: 'root',
})
export class IonicAppStateService
  extends AppStateService
  implements IAppStateService
{
  readonly INITIAL_STATE: AppViewModel = {
    headerData: homeHeaderData,
    itemCategories: [],
    items: [],
  };

  constructor(
    protected headerDataService: IonicHeaderDataService,
    protected ionicStorageSvc: IonicStorageUtilService,
    protected store: Store<AppState>,
    private _router: Router
  ) {
    super(headerDataService, ionicStorageSvc, store);
  }

  getViewModel(): Observable<AppViewModel> {
    return super.getViewModel(this.INITIAL_STATE.headerData!);
  }

  handleAddListClickEvent(): void {
    this.headerDataService.setNextHeader();
  }

  handleItemDetailClickEvent(item: GroceryItem): void {
    this.headerDataService.setItemDetailHeader(item);
  }

  addItemToList(addItemForm: FormGroup): void {
    super.addItemToList(addItemForm);
    this._store.dispatch(SetHeader({headerData: this.INITIAL_STATE.headerData!}));
    this._router.navigate(['']);

  }
}
