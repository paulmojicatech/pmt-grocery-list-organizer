import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { IStorageUtilSvc } from '../storage-util.interface';

@Injectable({
  providedIn: 'root'
})
export class WebStorageUtilService implements IStorageUtilSvc {

  getStorageItem(key: string): Observable<string> {
    return of(`${localStorage.getItem(key)}`);
  }

  setStorageItem(key: string, value: string): Observable<void> {
    localStorage.setItem(key, value);
    return EMPTY;
  }
}
