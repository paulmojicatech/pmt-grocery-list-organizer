import { Injectable, OnInit } from '@angular/core';

import { EMPTY, from, Observable, of } from 'rxjs';

import { IStorageUtilSvc } from '../storage-util.interface';
import { Storage } from '@ionic/storage-angular';
import { StorageType } from '../models/storage.interface';
import { AppState, GroceryItem } from '../../state/app-state.interface';
import { Store } from '@ngrx/store';
import { LoadItems } from '../../state/actions/app.actions';
import { filter, last, map, switchMap, take, takeLast, tap } from 'rxjs/operators';
import { getAllItems } from '../../state';

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

  setStorageItem(key: StorageType, value: string): void {
    this._storage.set(key, value);
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
  }

  async updateCurrentGroceryItem(value: GroceryItem): Promise<void> {
    const stringifiedCurrentItems = await this._storage.get(
      StorageType.GROCERY_ITEM
    )!;
    const currentItems: GroceryItem[] = !!stringifiedCurrentItems
      ? JSON.parse([...stringifiedCurrentItems].join(''))
      : [];
    const currentIndex = currentItems.findIndex(item => item.name === value.name);
    currentItems[currentIndex] = value;
    await this._storage.set(
      StorageType.GROCERY_ITEM,
      JSON.stringify(currentItems)
    );
  }

  archiveUsedItem(itemId: string, isDeleted: boolean): void {
    this._store.select(getAllItems).pipe(
      filter(items => !!items.length),
      map(items => items.find(item => item.id === itemId)),
      filter(itemToArchive => !!itemToArchive),
      switchMap(itemToArchive => from(this._storage.get((StorageType.ARCHIVED_GROCERY_ITEM))).pipe(
        tap(archivedItems => {
          const updatedItemToArchive = isDeleted ? {...itemToArchive, dateDeleted: new Date().toDateString()} : {...itemToArchive, dateUsed: new Date().toDateString()};
          const updatedItems = !!archivedItems ? [...JSON.parse(archivedItems), updatedItemToArchive] : [updatedItemToArchive];
          this._storage.set(StorageType.ARCHIVED_GROCERY_ITEM, JSON.stringify(updatedItems));
        })
      )),
      take(1)
    ).subscribe();
  }

}
