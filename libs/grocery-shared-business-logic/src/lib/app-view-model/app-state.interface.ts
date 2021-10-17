import { BehaviorSubject, Observable } from "rxjs";
import { HeaderData } from "../state/app-state.interface";

export type AppViewModel = {
    headerData?: HeaderData;
    isAddVisible?: boolean;
};

export interface IAppStateService {
    viewModel$: Observable<AppViewModel>;
    getViewModel: () => Observable<AppViewModel>
}