import { createReducer, on } from '@ngrx/store';
import { homeHeaderData, thingsWeNeedHeaderData } from '../../header-data/header-data-actions/header-data-actions';
import {
  AddItem,
  AddItemToCurrentList,
  ItemPurchased,
  LoadItems,
  SetHeader,
  SwitchHomeView,
} from '../actions/app.actions';
import { AppState } from '../app-state.interface';
import { HomeViewType } from '../models/app.model';

const INITIAL_STATE: AppState = {
  headerData: undefined,
  allItems: [],
  currentHomeView: HomeViewType.THINGS_WE_HAVE
};

export const AppReducer = createReducer(
  INITIAL_STATE,
  on(SetHeader, (state, { headerData }) => ({ ...state, headerData })),
  on(AddItem, (state, { item }) => {
    const updatedItems = !!state.allItems ? [...state.allItems, item] : [item];
    return { ...state, allItems: updatedItems };
  }),
  on(AddItemToCurrentList, (state, { itemToAdd }) => {
    const itemIndex = state.allItems?.findIndex(
      (item) => item?.id === itemToAdd.id
    );
    if (itemIndex === -1) {
      const sortedItems =
        state.allItems
          .filter((item) => !!item?.id)
      const newId = sortedItems[0].id;
      const itemWithId = { ...itemToAdd, id: newId };
      return {
        ...state,
        allItems: [...state.allItems!, itemWithId],
      };
    } else {
      const copyItems = [...state.allItems!];
      copyItems[itemIndex as number] = itemToAdd;
      return {
        ...state,
        allItems: copyItems,
      };
    }
  }),
  on(LoadItems, (state, { allItems }) => ({ ...state, allItems })),
  on(
    SwitchHomeView,
    (state, { viewToSwitchTo }) => {
      return {
        ...state,
        headerData: viewToSwitchTo === HomeViewType.THINGS_WE_HAVE ? homeHeaderData : thingsWeNeedHeaderData,
        currentHomeView: viewToSwitchTo === HomeViewType.THINGS_WE_HAVE ? HomeViewType.THINGS_WE_HAVE : HomeViewType.THINGS_WE_NEED
      };
    }
  )
);
