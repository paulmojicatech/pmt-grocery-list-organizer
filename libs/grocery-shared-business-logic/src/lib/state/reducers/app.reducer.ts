import { createReducer, on, State } from "@ngrx/store";
import { AddItem, AddItemToCurrentList, SetHeader } from "../actions/app.actions";
import { AppState, CurrentGroceryItem } from "../app-state.interface";

const INITIAL_STATE: AppState = {
    headerData: undefined,
    allItems: []
};

export const AppReducer = createReducer(
    INITIAL_STATE,
    on(
        SetHeader,
        (state, { headerData }) => ({...state, headerData})
    ),
    on(
        AddItem,
        (state, { item }) => ({...state, allItems: [...state.allItems, item]})
    ),
    on(
        AddItemToCurrentList,
        (state, { itemToAdd }) => {
            const itemIndex = state.allItems.findIndex((item) => (item as CurrentGroceryItem)?.id === itemToAdd.id);
            if (itemIndex === -1) {
                const sortedItems = state.allItems
                    .filter(item => !!(item as CurrentGroceryItem).id)
                    .sort((previousItem, nextItem) => {
                        if ((previousItem as CurrentGroceryItem).id > (nextItem as CurrentGroceryItem).id) {
                            return -1;
                        }
                        return 1;
                    });
                const newId = (sortedItems as CurrentGroceryItem[])[0].id;
                const itemWithId = {...itemToAdd, id: newId};
                return {
                    ...state,
                    allItems: [...state.allItems, itemWithId]
                };
            } else {
                const copyItems = [...state.allItems];
                copyItems[itemIndex] = itemToAdd;
                return {
                    ...state,
                    allItems: copyItems
                };
            }
        }
    )
);