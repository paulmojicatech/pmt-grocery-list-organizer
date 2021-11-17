import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import {
  filter,
  ignoreElements,
  map,
  take,
  tap,
} from 'rxjs/operators';
import { IHeaderDataService } from '../header-data/header-data-service.interface';
import { getAllItems } from '../state';
import { LoadItems } from '../state/actions/app.actions';
import {
  AppState,
  GroceryItem,
  GroceryItemCategoryType,
  HeaderData,
} from '../state/app-state.interface';
import { StorageType } from '../storage/models/storage.interface';
import { IStorageUtilSvc } from '../storage/storage-util.interface';
import { AppViewModel } from './app-state.interface';

export abstract class AppStateService {
  protected INITIAL_STATE: AppViewModel = {
    headerData: undefined,
    items: [],
    itemCategories: [],
  };
  protected viewModelSub$ = new BehaviorSubject<AppViewModel>(
    this.INITIAL_STATE
  );
  viewModel$ = this.viewModelSub$.asObservable();

  constructor(
    protected headerDataService: IHeaderDataService,
    protected storageSvc: IStorageUtilSvc,
    protected _store: Store<AppState>
  ) {}

  getViewModel(defaultHeaderData: HeaderData): Observable<AppViewModel> {
    const loadGroceryItems$ = this.storageSvc
      .getStorageItem(StorageType.GROCERY_ITEM)
      .pipe(
        tap((items) => {
          this._store.dispatch(LoadItems({ allItems: items }));
        }),
        take(1),
        ignoreElements()
      );
    const headerData$ = this.headerDataService
      .getHeaderData(defaultHeaderData)
      .pipe(filter((headerData) => !!headerData));
    let itemCategories: string[] = Object.values(GroceryItemCategoryType);
    const itemCategories$ = of(itemCategories);
    const allItems$ = this._store.select(getAllItems);
    const initialViewModel$ = combineLatest([
      headerData$,
      itemCategories$,
      allItems$,
    ]).pipe(
      map(([headerData, itemCategories, items]) => {
        return { headerData, itemCategories, items };
      })
    );
    return merge(initialViewModel$, this.viewModel$, loadGroceryItems$);
  }

  addItemToList(addItemForm: FormGroup): void {
    const addToCurrentList = !!addItemForm.get('addToCurrentList')?.value;
    const item = addItemForm.get('item')?.value;
    const itemCategory = addItemForm.get('itemCategory')?.value;
    const itemToAdd: GroceryItem = {
      id: addToCurrentList ? this.generateItemId() : undefined,
      name: item,
      category: itemCategory,
      datePurchased: addToCurrentList ? new Date().toDateString() : undefined,
    };
    this.storageSvc.addGroceryItem(itemToAdd);
  }

  generateItemId(): string {
    return Math.random().toString(16).substr(2, 16);
  }
}
