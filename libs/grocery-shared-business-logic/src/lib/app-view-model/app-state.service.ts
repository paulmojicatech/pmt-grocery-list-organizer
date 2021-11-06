import { Store } from "@ngrx/store";
import { BehaviorSubject, from, merge, Observable, of, Subject } from "rxjs";
import { ignoreElements, map, skipUntil, startWith, take, tap } from "rxjs/operators";
import { IHeaderDataService } from "../header-data/header-data-service.interface";
import { LoadItems } from "../state/actions/app.actions";
import { AppState, GroceryItem, HeaderData } from "../state/app-state.interface";
import { StorageType } from "../storage/models/storage.interface";
import { IStorageUtilSvc } from "../storage/storage-util.interface";
import { AppViewModel } from "./app-state.interface";

export abstract class AppStateService {
    protected INITIAL_STATE: AppViewModel = {
        headerData: undefined
    };
    protected viewModelSub$ = new BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
    viewModel$ = this.viewModelSub$.asObservable();

    constructor(protected headerDataService: IHeaderDataService, protected storageSvc: IStorageUtilSvc, protected _store: Store<AppState>) {}

    getViewModel(defaultHeaderData: HeaderData): Observable<AppViewModel> {
        const loadGroceryItems$ = this.storageSvc.getStorageItem(StorageType.GROCERY_ITEM).pipe(
            map(unParsedItems => {
                const parsedItems = !!unParsedItems ? JSON.parse(unParsedItems) : [];
                return parsedItems as GroceryItem[];
            }),
            tap(items => this._store.dispatch(LoadItems({allItems: items}))),
            take(1),
            ignoreElements()
        );
        const initialViewModel$ = this.headerDataService.getHeaderData(defaultHeaderData).pipe(
            map(storeHeaderData => {
                return { headerData: storeHeaderData };
            }),
            tap(vm => {
                this.viewModelSub$.next(vm);
            })
        );
        return merge(initialViewModel$, this.viewModel$, loadGroceryItems$);
    }
}