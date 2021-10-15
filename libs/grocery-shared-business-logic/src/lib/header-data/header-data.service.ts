import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import { Observable, Subject } from "rxjs";
import { map, skipUntil } from 'rxjs/operators';
import { SetHeader } from "../state/actions/app.actions";
import { AppState, HeaderData } from "../state/app-state.interface";
import { IHeaderDataService } from "./header-data-service.interface";

export abstract class HeaderDataService implements IHeaderDataService {
    constructor(protected store: Store<AppState>, protected router: Router){}

    getHeaderData(headerDataToDispatch: HeaderData): Observable<HeaderData | undefined> {
        const isLoaded = new Subject<void>();
        return this.store.select('headerData').pipe(
            map(headerData => {
                if (!!headerData) {
                    isLoaded.next();
                    isLoaded.complete();
                    return headerData;
                } else {
                    this.dispatchEvent(headerDataToDispatch);
                    return undefined;
                }
            }),
            skipUntil(isLoaded)
        ) as Observable<HeaderData | undefined>;
    }

    addList(): void {
        this.router.navigate(['add-list'])
    }

    protected dispatchEvent(headerData: HeaderData): void {
        this.store.dispatch(SetHeader({headerData}));
    }
}