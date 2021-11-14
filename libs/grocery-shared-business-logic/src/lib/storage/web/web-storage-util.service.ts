import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadItems } from '../../state/actions/app.actions';
import { AppState, GroceryItem } from '../../state/app-state.interface';

import { StorageType } from '../models/storage.interface';
import { IStorageUtilSvc } from '../storage-util.interface';

@Injectable({
  providedIn: 'root',
})
export class WebStorageUtilService implements IStorageUtilSvc {
  constructor(private _store: Store<AppState>) {}

  getStorageItem(key: StorageType): Observable<GroceryItem[]> {
    return of(`${localStorage.getItem(key)}`).pipe(
      map(stringifiedValue => {
        if (!!stringifiedValue) {
          return JSON.parse(stringifiedValue);
        } else {
          return [];
        }
        
      })
    );
  }

  async addGroceryItem(item: GroceryItem): Promise<void> {
    const stringifiedCurrentItems = localStorage.getItem(
      StorageType.GROCERY_ITEM
    )!;
    const currentItems: GroceryItem[] = !!stringifiedCurrentItems
      ? JSON.parse(stringifiedCurrentItems)
      : [];
    localStorage.setItem(
      StorageType.GROCERY_ITEM,
      JSON.stringify([...currentItems, item])
    );
    this._store.dispatch(LoadItems({ allItems: [...currentItems, item] }));
  }
}
