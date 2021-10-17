import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AppState, CurrentGroceryItem, GroceryItem } from "../state/app-state.interface";
import { IItemServce } from "./item-service.interface";

export abstract class ItemService implements IItemServce {

    constructor(protected store: Store<AppState>) {
        
    }

    getAllItems(): Observable<GroceryItem[]> {
        return of([]);
    }

    getCurrentItems(): Observable<CurrentGroceryItem[]> {
        return of([]);
    }

    addItem(itemToAdd: GroceryItem): void {

    }


}