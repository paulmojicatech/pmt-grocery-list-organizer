import { Observable } from "rxjs";
import { GroceryItem, GroceryItemCategoryType, HeaderData } from "../state/app-state.interface";

export type AppViewModel = {
    headerData?: HeaderData;
    isAddVisible?: boolean;
    itemCategories: string[];
    items: GroceryItem[];
    
};

export interface IAppStateService {
    viewModel$: Observable<AppViewModel>;
    getViewModel: () => Observable<AppViewModel>
}