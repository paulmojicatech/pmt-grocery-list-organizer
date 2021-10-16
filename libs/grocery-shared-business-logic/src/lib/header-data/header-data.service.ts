import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import { Observable, Subject } from "rxjs";
import { map, skipUntil } from 'rxjs/operators';
import { SetHeader } from "../state/actions/app.actions";
import { AppState, HeaderData } from "../state/app-state.interface";
import { IHeaderDataService } from "./header-data-service.interface";

export abstract class HeaderDataService implements IHeaderDataService {
    constructor(protected store: Store<AppState>){}

    getHeaderData(): Observable<HeaderData> {
        return this.store.select('headerData') as Observable<HeaderData>;
    }

    dispatchEvent(headerData: HeaderData): void {
        this.store.dispatch(SetHeader({headerData}));
    }
}