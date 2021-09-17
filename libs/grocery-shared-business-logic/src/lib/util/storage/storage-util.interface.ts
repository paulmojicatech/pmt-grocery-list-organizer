import { Observable } from "rxjs";
import { SQLite } from '@ionic-native/sqlite/ngx/index';

export interface IStorageUtilSvc {
    getStorageItem: (key: string) => Observable<string>;
    setStorageItem: (key: string, value: string) => Observable<void>;
}

export type StorageAdapter = SQLite | Window;
