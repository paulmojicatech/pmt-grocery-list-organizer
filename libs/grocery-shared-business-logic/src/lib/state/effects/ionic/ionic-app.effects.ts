import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { IonicStorageUtilService } from "../../../storage/ionic/ionic-storage-util.service";
import { StorageType } from "../../../storage/models/storage.interface";
import { AddItem, AddItemToCurrentList, GoBackToHome, MarkItemUsed, MarkItemUsedSuccess, OpenAddItemList, OpenItemDetail, SwitchHomeView } from "../../actions/app.actions";
import { HomeViewType } from "../../models/app.model";
import { AppEffects } from "../app.effects";

@Injectable()
export class IonicAppEffects extends AppEffects {
    constructor(protected _actions$: Actions, private _navCtrl: NavController, private _ionicStorageSvc: IonicStorageUtilService){
        super(_actions$);
    }

    openItemDetailRoute$ = createEffect(() => this._actions$.pipe(
        ofType(OpenItemDetail),
        tap(action => this._navCtrl.navigateForward([`item-detail/${action.item.id}`]))
    ), { dispatch: false });

    goBackToHomeRoute$ = createEffect(() => this._actions$.pipe(
        ofType(GoBackToHome),
        tap(() => this._navCtrl.back())
    ), { dispatch: false});

    openAddItemListRoute$ = createEffect(() => this._actions$.pipe(
        ofType(OpenAddItemList),
        tap(() => this._navCtrl.navigateForward(['add-list']))
    ), { dispatch: false });

    switchViewRoute$ = createEffect(
        () => this._actions$.pipe(
            ofType(SwitchHomeView),
            tap(action => {
                if (action.viewToSwitchTo === HomeViewType.THINGS_WE_HAVE) {
                    this._navCtrl.navigateForward(['']);
                } else {
                    this._navCtrl.navigateForward(['things-we-need']);
                }
            })
        ), { dispatch: false }
    );

    addItemToStorage$ = createEffect(
        () => this._actions$.pipe(
            ofType(AddItem),
            tap(action => this._ionicStorageSvc.addGroceryItem(action.item))
        ), { dispatch: false }
    );
    
    updateMarkedPurchasedItemToStorage$ = createEffect(
        () => this._actions$.pipe(
            ofType(AddItemToCurrentList),
            tap(action => this._ionicStorageSvc.updateCurrentGroceryItem(action.itemToAdd))
        ), { dispatch: false }
    );

    markItemAsUsed$ = createEffect(
        () => this._actions$.pipe(
            ofType(MarkItemUsed),
            tap(action => this._ionicStorageSvc.archiveUsedItem(action.itemId, false)),
            switchMap(action => from(this._ionicStorageSvc.getStorageItem(StorageType.GROCERY_ITEM)).pipe(
                map(currentItems => {
                    const updatedItems = [...currentItems];
                    const itemIndex = updatedItems.findIndex(item => item.id === action.itemId);
                    updatedItems[itemIndex] = {...updatedItems[itemIndex], id: undefined, datePurchased: undefined};
                    return MarkItemUsedSuccess({updatedItems});
                })
            ))
        )
    );

    markItemAsUsedUpdateStorage$ = createEffect(
        () => this._actions$.pipe(
            ofType(MarkItemUsedSuccess),
            tap(actions => {
                const stringifiedItems = JSON.stringify(actions.updatedItems);
                this._ionicStorageSvc.setStorageItem(StorageType.GROCERY_ITEM, stringifiedItems);
            })
        ), { dispatch: false }
    );
}