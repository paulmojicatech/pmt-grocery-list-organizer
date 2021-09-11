import { Observable } from "rxjs";
import { SQLite } from '@ionic-native/sqlite/ngx/index';

export interface IStorageUtilSvc {
    getStorageItem: (key: string) => Observable<unknown> | undefined;
    setStorageItem: (key: string, value: unknown) => Observable<void> | undefined;
}

export type StorageAdapter = SQLite | Window;
