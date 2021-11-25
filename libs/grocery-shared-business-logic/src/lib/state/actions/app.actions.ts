import { createAction, props } from '@ngrx/store';
import {
  GroceryItem,
  HeaderData,
} from '../app-state.interface';

export const SET_HEADER = '[APP] Set Header';
export const ADD_ITEM = '[APP] Add Item';
export const ADD_ITEM_TO_CURRENT_LIST = '[APP] Add Item to Current List';
export const LOAD_ITEMS = '[APP] Load All Items to Store';
export const OPEN_ITEM_DETAIL = '[APP] Open Item Detail';
export const GO_BACK_TO_HOME = '[APP] Go Back to Home';
export const OPEN_ADD_ITEM_LIST = '[APP] Open Add Item List';

export const SetHeader = createAction(
  SET_HEADER,
  props<{ headerData: HeaderData }>()
);

export const AddItem = createAction(ADD_ITEM, props<{ item: GroceryItem }>());

export const AddItemToCurrentList = createAction(
  ADD_ITEM_TO_CURRENT_LIST,
  props<{ itemToAdd: GroceryItem }>()
);

export const LoadItems = createAction(
  LOAD_ITEMS,
  props<{ allItems: GroceryItem[] }>()
);

export const OpenItemDetail = createAction(
  OPEN_ITEM_DETAIL,
  props<{item: GroceryItem; headerData: HeaderData }>()
)

export const GoBackToHome = createAction(
  GO_BACK_TO_HOME,
  props<{headerData: HeaderData }>()
);

export const OpenAddItemList = createAction(
  OPEN_ADD_ITEM_LIST,
  props<{headerData: HeaderData}>()
);