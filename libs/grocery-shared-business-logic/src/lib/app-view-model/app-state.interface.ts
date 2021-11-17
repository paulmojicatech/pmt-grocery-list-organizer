import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GroceryItem, HeaderData } from '../state/app-state.interface';

export type AppViewModel = {
  headerData?: HeaderData;
  itemCategories: string[];
  items: GroceryItem[];
};

export interface IAppStateService {
  viewModel$: Observable<AppViewModel>;
  getViewModel: () => Observable<AppViewModel>;
  addItemToList: (itemToAdd: FormGroup) => void;
}
