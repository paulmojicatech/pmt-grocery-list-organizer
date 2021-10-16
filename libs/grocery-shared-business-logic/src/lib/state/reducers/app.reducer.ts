import { createReducer, on, State } from "@ngrx/store";
import { SetExpiringItems, SetHeader, SetIsLoading } from "../actions/app.actions";
import { AppState } from "../app-state.interface";

const INITIAL_STATE: AppState = {
    isLoading: false,
    expiringItems: [],
    headerData: undefined
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
    ),
    on(
        SetHeader,
        (state, { headerData }) => ({...state, headerData})
    )
);