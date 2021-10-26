import { Injectable } from '@angular/core';

import { EMPTY, from, Observable } from 'rxjs';

import { IStorageUtilSvc } from '../storage-util.interface';
import { Storage } from '@ionic/storage-angular';
import { StorageType } from '../models/storage.interface';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageUtilService implements IStorageUtilSvc {

  constructor(private _storage: Storage){
    this._storage.create();
  }

  getStorageItem(key: StorageType): Observable<string> {
    return from(this._storage.get(key));
  }

  setStorageItem(key: StorageType, value: string): void {
      this._storage.set(`${key}`, value);
  }
  
}
