import { Observable } from 'rxjs';
import { GroceryItem } from '../state/app-state.interface';
import { StorageType } from './models/storage.interface';
export interface IStorageUtilSvc {
  getStorageItem: (key: StorageType) => Observable<GroceryItem[]>;
  addGroceryItem: (item: GroceryItem) => Promise<void>;
}
