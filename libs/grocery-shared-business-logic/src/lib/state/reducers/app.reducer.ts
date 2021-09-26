import { createReducer, on } from "@ngrx/store";
import { SetExpiringItems, SetIsLoading } from "../actions/app.actions";
import { AppState } from "../app-state.interface";

const INITIAL_STATE: AppState = {
    isLoading: false,
    expiringItems: []
};

export const AppReducer = createReducer(
    INITIAL_STATE,
    on(
        SetIsLoading,
        (state, { isLoading})=> ({...state, isLoading})
    ),
    on(
        SetExpiringItems,
        (state, { expiringItems} ) => ({...state, expiringItems})
    )
);