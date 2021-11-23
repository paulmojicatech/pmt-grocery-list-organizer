import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addItemHeaderData, homeHeaderData, itemDetailHeaderData } from '../../header-data/header-data-actions/header-data-actions';
import { IonicHeaderDataService } from '../../header-data/ionic/ionic-header-data.service';
import { GoBackToHome, OpenAddItemList, OpenItemDetail, SetHeader } from '../../state/actions/app.actions';
import {
  AppState,
  GroceryItem,
  HeaderButton,
  HeaderButtonPosition,
  HeaderData,
  HeaderType,
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
    private _router: Router,
    private _navCtrl: NavController
  ) {
    super(headerDataService, ionicStorageSvc, store);
  }

  getViewModel(): Observable<AppViewModel> {
    return super.getViewModel(this.INITIAL_STATE.headerData!);
  }

  handleAddListClickEvent(button: HeaderButton): void {
    switch (button.nextHeaderData) {
      case HeaderType.HOME_HEADER:
        this._store.dispatch(GoBackToHome({headerData: homeHeaderData}))
        break;
      case HeaderType.ADD_ITEM_HEADER:
        this._store.dispatch(OpenAddItemList({headerData: addItemHeaderData}))
        break;
      default:
        break;
    }
    
  }

  handleItemDetailClickEvent(item: GroceryItem): void {
    const headerData = {...itemDetailHeaderData, title: item.name };
    this._store.dispatch(OpenItemDetail({headerData, item}));
  }

  addItemToList(addItemForm: FormGroup): void {
    super.addItemToList(addItemForm);
    this._store.dispatch(SetHeader({headerData: this.INITIAL_STATE.headerData!}));
    // this._router.navigate(['']);

  }
}
