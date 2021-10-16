import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import { Observable, of, Subject } from "rxjs";
import { map, skipUntil, tap } from 'rxjs/operators';
import { SetHeader } from "../state/actions/app.actions";
import { AppState, HeaderData } from "../state/app-state.interface";
import { IHeaderDataService } from "./header-data-service.interface";
import { getHeaderData } from "../state";

export abstract class HeaderDataService implements IHeaderDataService {
    constructor(protected store: Store<AppState>){}

    getHeaderData(headerData?: HeaderData): Observable<HeaderData | undefined> {
        const headerData$ = this.store.select(getHeaderData).pipe(
            map(storeHeaderData => {
                if (!storeHeaderData) {
                    this.dispatchEvent(headerData!);
                }
                return storeHeaderData;
            }),
            tap(storeHeaderData => {
                console.log('STORE HEADER', storeHeaderData);
            })
        );
        return headerData$;
    }

    dispatchEvent(headerData: HeaderData): void {
        this.store.dispatch(SetHeader({headerData}));
    }
}