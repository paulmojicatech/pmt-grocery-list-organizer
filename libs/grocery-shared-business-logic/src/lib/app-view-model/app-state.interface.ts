import { Observable } from "rxjs";
import { GroceryItemCategoryType, HeaderData } from "../state/app-state.interface";

export type AppViewModel = {
    headerData?: HeaderData;
    isAddVisible?: boolean;
    itemCategories?: string[];
    
};

export interface IAppStateService {
    viewModel$: Observable<AppViewModel>;
    getViewModel: () => Observable<AppViewModel>
}