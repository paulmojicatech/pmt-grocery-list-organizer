import { createAction, props } from '@ngrx/store';
import { CurrentGroceryItem, GroceryItem, HeaderData } from '../app-state.interface';

export const SET_HEADER = '[APP] Set Header';
export const ADD_ITEM = '[APP] Add Item';
export const ADD_ITEM_TO_CURRENT_LIST = '[APP] Add Item to Current List';
export const LOAD_ITEMS = '[APP] Load All Items to Store'

export const SetHeader = createAction(
    SET_HEADER,
    props<{headerData: HeaderData}>()
);

export const AddItem = createAction(
  ADD_ITEM,
  props<{item: GroceryItem}>()
);

export const AddItemToCurrentList = createAction(
  ADD_ITEM_TO_CURRENT_LIST,
  props<{itemToAdd: CurrentGroceryItem}>()
);

export const LoadItems = createAction(
  LOAD_ITEMS,
  props<{allItems: GroceryItem[]}>()
);
