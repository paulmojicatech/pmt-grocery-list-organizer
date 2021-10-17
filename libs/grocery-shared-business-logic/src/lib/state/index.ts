import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, CurrentGroceryItem } from "./app-state.interface";

const appState = createFeatureSelector<AppState>('app');

export const getHeaderData = createSelector(
    appState,
    state => state.headerData
);

export const getAllItems = createSelector(
    appState,
    state => state.allItems
);

export const getCurrentItems = createSelector(
    appState,
    state => {
        return state.allItems.filter(item => !!(item as CurrentGroceryItem).id)
    }
);
