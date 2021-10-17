import { BehaviorSubject, from, merge, Observable, of, Subject } from "rxjs";
import { map, skipUntil, startWith, tap } from "rxjs/operators";
import { IHeaderDataService } from "../header-data/header-data-service.interface";
import { HeaderData } from "../state/app-state.interface";
import { AppViewModel } from "./app-state.interface";

export abstract class AppStateService {
    protected INITIAL_STATE: AppViewModel = {
        headerData: undefined
    };
    protected viewModelSub$ = new BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
    viewModel$ = this.viewModelSub$.asObservable();

    constructor(protected headerDataService: IHeaderDataService) {}

    getViewModel(defaultHeaderData: HeaderData): Observable<AppViewModel> {
        const initialViewModel$ = this.headerDataService.getHeaderData(defaultHeaderData).pipe(
            map(storeHeaderData => {
                return { headerData: storeHeaderData };
            }),
            tap(vm => {
                this.viewModelSub$.next(vm);
            })
        );
        return merge(initialViewModel$, this.viewModel$);
    }
}