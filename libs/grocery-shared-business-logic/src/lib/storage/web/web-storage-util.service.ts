import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { StorageType } from '../models/storage.interface';
import { IStorageUtilSvc } from '../storage-util.interface';

@Injectable({
  providedIn: 'root'
})
export class WebStorageUtilService implements IStorageUtilSvc {

  getStorageItem(key: StorageType): Observable<string> {
    return of(`${localStorage.getItem(key)}`);
  }

  setStorageItem(key: StorageType, value: string): void {
    localStorage.setItem(key, value);
  }
}
