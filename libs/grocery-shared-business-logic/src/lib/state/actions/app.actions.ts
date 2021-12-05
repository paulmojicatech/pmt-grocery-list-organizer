import { createAction, props } from '@ngrx/store';
import {
  GroceryItem,
  HeaderData,
} from '../app-state.interface';
import { HomeViewType } from '../models/app.model';

export const SET_HEADER = '[APP] Set Header';
export const ADD_ITEM = '[APP] Add Item';
export const ADD_ITEM_TO_CURRENT_LIST = '[APP] Add Item to Current List';
export const LOAD_ITEMS = '[APP] Load All Items to Store';
export const OPEN_ITEM_DETAIL = '[APP] Open Item Detail';
export const GO_BACK_TO_HOME = '[APP] Go Back to Home';
export const OPEN_ADD_ITEM_LIST = '[APP] Open Add Item List';
export const SWITCH_HOME_VIEW = '[APP] Switch Home View';
export const ITEM_PURCHASED = '[APP] Mark Item Needed to Item Purchased'

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

export const SwitchHomeView = createAction(
  SWITCH_HOME_VIEW,
  props<{viewToSwitchTo: HomeViewType}>()
);

export const ItemPurchased = createAction(
  ITEM_PURCHASED,
  props<{item: GroceryItem}>()
);