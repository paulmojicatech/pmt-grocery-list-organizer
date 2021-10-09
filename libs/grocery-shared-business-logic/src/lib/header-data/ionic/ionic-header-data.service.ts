import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app-state.interface';
import { IHeaderDataService } from '../header-data-service.interface';
import { HeaderDataService } from '../header-data.service';

@Injectable({providedIn: 'root'})
export class IonicHeaderDataService extends HeaderDataService implements IHeaderDataService {

  constructor(protected store: Store<AppState>, protected router: Router) {
    super(store, router);
  }

}
