import { Injectable, OnInit } from '@angular/core';

import { EMPTY, from, Observable, of } from 'rxjs';

import { IStorageUtilSvc } from '../storage-util.interface';
import { Storage } from '@ionic/storage-angular';
import { StorageType } from '../models/storage.interface';
import { AppState, GroceryItem } from '../../state/app-state.interface';
import { Store } from '@ngrx/store';
import { LoadItems } from '../../state/actions/app.actions';
import { last, map, takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IonicStorageUtilService implements OnInit, IStorageUtilSvc {
  constructor(private _storage: Storage, private _store: Store<AppState>) {
  }

  async ngOnInit(): Promise<void> {
    await this._storage.create();
  }

  getStorageItem(key: StorageType): Observable<GroceryItem[]> {
    return from(this._storage.get(key)).pipe(
      last(),
      map(strigifiedValue => {
        if (!!strigifiedValue) {
          const joinedValue = [...strigifiedValue].join('');
          return JSON.parse(joinedValue);
        } else {
          return [];
        }
      })
    );
  }

  async addGroceryItem(value: GroceryItem): Promise<void> {
    const stringifiedCurrentItems = await this._storage.get(
      StorageType.GROCERY_ITEM
    )!;
    const currentItems: GroceryItem[] = !!stringifiedCurrentItems
      ? JSON.parse([...stringifiedCurrentItems].join(''))
      : [];
    await this._storage.set(
      StorageType.GROCERY_ITEM,
      JSON.stringify([...currentItems, value])
    );
    this._store.dispatch(LoadItems({ allItems: [...currentItems, value] }));
  }
}
