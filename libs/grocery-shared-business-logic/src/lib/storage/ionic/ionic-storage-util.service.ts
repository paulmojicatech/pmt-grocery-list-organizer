import { Injectable } from '@angular/core';

import { EMPTY, from, Observable } from 'rxjs';

import { IStorageUtilSvc } from '../storage-util.interface';
import { Storage } from '@ionic/storage-angular';
import { StorageType } from '../models/storage.interface';
import { AppState, GroceryItem } from '../../state/app-state.interface';
import { Store } from '@ngrx/store';
import { LoadItems } from '../../state/actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageUtilService implements IStorageUtilSvc {

  constructor(private _storage: Storage, private _store: Store<AppState>){
    this._storage.create();
  }

  getStorageItem(key: StorageType): Observable<string> {
    return from(this._storage.get(key));
  }

  async addGroceryItem(value: GroceryItem): Promise<void> {
      const stringifiedItem = JSON.stringify(value);
      const stringifiedCurrentItems = await this._storage.get(StorageType.GROCERY_ITEM);
      this._storage.set(StorageType.GROCERY_ITEM, [...stringifiedCurrentItems, ...stringifiedItem]);
      const currenItems: GroceryItem[] = JSON.parse(stringifiedCurrentItems);
      this._store.dispatch(LoadItems({allItems: [...currenItems, value]}));
  }
  
}
