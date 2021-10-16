import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app-state.interface";

const appState = createFeatureSelector<AppState>('app');

export const getHeaderData = createSelector(
    appState,
    state => state.headerData
);
