import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { getHeaderData } from '../../state';
import {
  AppState,
  GroceryItem,
  HeaderButtonPosition,
  HeaderData,
} from '../../state/app-state.interface';
import { IHeaderDataService } from '../header-data-service.interface';
import { HeaderDataService } from '../header-data.service';
import { NavController } from '@ionic/angular';
import { SetHeader } from '../../state/actions/app.actions';

@Injectable({ providedIn: 'root' })
export class IonicHeaderDataService
  extends HeaderDataService
  implements IHeaderDataService
{
  constructor(
    protected store: Store<AppState>,
    private _router: Router,
    private _navController: NavController
  ) {
    super(store);
  }

  setNextHeader(): void {
    this.store
      .select(getHeaderData)
      .pipe(
        map((headerData) => {
          switch (headerData?.title) {
            case 'Current Grocery Items':
              return {
                headerData: {
                  title: 'Add item to list',
                  buttons: {
                    button: [
                      {
                        name: 'arrow-back',
                      },
                    ],
                    position: HeaderButtonPosition.START,
                  },
                },
                route: ['add-list'],
              };
            case 'Add item to list':
              return {
                headerData: {
                  title: 'Current Grocery Items',
                  buttons: {
                    button: [
                      {
                        name: 'add-circle-outline',
                      },
                    ],
                    isBack: true,
                    position: HeaderButtonPosition.END,
                  },
                },
                route: [''],
              };
            default:
              return {
                headerData: headerData!,
                route: [''],
              };
          }
        }),
        take(1)
      )
      .subscribe((streamData) => {
        const { headerData, route } = streamData!;
        this.dispatchEvent(headerData);
        if (headerData?.buttons.isBack) {
          this._navController.back();
        } else {
          this._router.navigate(route);
        }
      });
  }

  setItemDetailHeader(item: GroceryItem): void {
    const headerData: HeaderData = {
      title: `${item.name}`,
      buttons: {
        button: [
          {
            name: 'arrow-back'
          }
        ],
        isBack: true,
        position: HeaderButtonPosition.START
      }
    };
    
    this.store.dispatch(SetHeader({headerData}));
  }

}
