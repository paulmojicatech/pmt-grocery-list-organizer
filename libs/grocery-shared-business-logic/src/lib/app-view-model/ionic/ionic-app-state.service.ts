import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonicHeaderDataService } from '../../header-data/ionic/ionic-header-data.service';
import { HeaderButtonPosition, HeaderData } from '../../state/app-state.interface';
import { AppViewModel, IAppStateService } from '../app-state.interface';
import { AppStateService } from '../app-state.service';

@Injectable({
  providedIn: 'root'
})
export class IonicAppStateService extends AppStateService implements IAppStateService {

  readonly INITIAL_STATE: AppViewModel = {
    headerData: {
      title: 'Current Grocery Items',
      buttons: {
        button: [
          {
            name: 'add-circle-outline'
          }
        ],
        position: HeaderButtonPosition.END
      }
    }
  };

  constructor(protected headerDataService: IonicHeaderDataService, private _router: Router) {
    super(headerDataService);
   }

   getViewModel(): Observable<AppViewModel> {
    return super.getViewModel(this.INITIAL_STATE.headerData!);
   }

   handleAddListClickEvent(): void {
     this._router.navigate(['add-list']);
   }
}
