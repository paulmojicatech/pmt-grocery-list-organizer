import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebHeaderDataService } from '../../header-data/web/web-header-data.service';
import { HeaderButtonPosition, HeaderData } from '../../state/app-state.interface';
import { AppViewModel, IAppStateService } from '../app-state.interface';
import { AppStateService } from '../app-state.service';

@Injectable({
  providedIn: 'root'
})
export class WebAppStateService extends AppStateService implements IAppStateService {

  readonly INITIAL_STATE: AppViewModel = {
    headerData: {
      title: 'Current Grocery Items',
      buttons: {
          button: [
            {
              text: 'Add to list',
              name: 'add'
            }
          ],
          position: HeaderButtonPosition.END
      },
    }
  };

  protected viewModelSub$ = new BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
  
  constructor(protected headerDataService: WebHeaderDataService) {
    super(headerDataService);
  }

  getViewModel(): Observable<AppViewModel> {
    return super.getViewModel(this.INITIAL_STATE.headerData!);
  }

}
