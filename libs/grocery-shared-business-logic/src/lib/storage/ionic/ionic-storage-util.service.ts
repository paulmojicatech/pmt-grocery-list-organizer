import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { IStorageUtilSvc } from '../storage-util.interface';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageUtilService implements IStorageUtilSvc {

  getStorageItem(key: string): Observable<string> {
    return of(key);
  }

  setStorageItem(key: string, value: string): Observable<void> {
      return EMPTY;
  }
  
}
