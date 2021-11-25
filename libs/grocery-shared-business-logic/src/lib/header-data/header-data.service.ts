import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetHeader } from '../state/actions/app.actions';
import { AppState, HeaderData } from '../state/app-state.interface';
import { IHeaderDataService } from './header-data-service.interface';
import { getHeaderData } from '../state';

export abstract class HeaderDataService implements IHeaderDataService {
  constructor(protected store: Store<AppState>) {}

  getHeaderData(headerData?: HeaderData): Observable<HeaderData | undefined> {
    const headerData$ = this.store.select(getHeaderData).pipe(
      map((storeHeaderData) => {
        if (!storeHeaderData) {
          this.dispatchEvent(headerData!);
        }
        return storeHeaderData;
      })
    );
    return headerData$;
  }

  dispatchEvent(headerData: HeaderData): void {
    this.store.dispatch(SetHeader({ headerData }));
  }
}
