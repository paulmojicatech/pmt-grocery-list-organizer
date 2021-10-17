import { Observable } from "rxjs";
import { CurrentGroceryItem, GroceryItem } from "../state/app-state.interface";

export interface IItemServce {
    getAllItems: () => Observable<GroceryItem[]>;
    getCurrentItems: () => Observable<CurrentGroceryItem[]>;
    addItem: (itemToAdd: GroceryItem) => void;
}