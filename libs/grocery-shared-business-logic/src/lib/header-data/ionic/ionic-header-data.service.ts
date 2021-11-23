import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { getHeaderData } from '../../state';
import {
  AppState,
  GroceryItem,
  HeaderButtonPosition,
  HeaderData,
} from '../../state/app-state.interface';
import { IHeaderDataService } from '../header-data-service.interface';
import { HeaderDataService } from '../header-data.service';
import { NavController } from '@ionic/angular';
import { SetHeader } from '../../state/actions/app.actions';

@Injectable({ providedIn: 'root' })
export class IonicHeaderDataService
  extends HeaderDataService
  implements IHeaderDataService
{
  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  setNextHeader(headerData: HeaderData): void {
    this.store.dispatch(SetHeader({headerData}));
  }


}
