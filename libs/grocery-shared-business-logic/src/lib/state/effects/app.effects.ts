import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from "rxjs/operators";
import { GoBackToHome, OpenAddItemList, OpenItemDetail, SetHeader, SwitchHomeView } from "../actions/app.actions";
import { HomeViewType } from "../models/app.model";

@Injectable()
export class AppEffects {
    constructor(private _actions$: Actions, private _navCtrl: NavController){}

    openItemDetailHeader$ = createEffect(() => this._actions$.pipe(
        ofType(OpenItemDetail),
        map(action => {
            return SetHeader({headerData: action.headerData})
        })
    ));

    openItemDetailRoute$ = createEffect(() => this._actions$.pipe(
        ofType(OpenItemDetail),
        tap(action => this._navCtrl.navigateForward([`item-detail/${action.item.id}`]))
    ), { dispatch: false });

    goBackToHomeHeader$ = createEffect(() => this._actions$.pipe(
        ofType(GoBackToHome),
        map(action => SetHeader({headerData: action.headerData}))
    ));

    goBackToHomeRoute$ = createEffect(() => this._actions$.pipe(
        ofType(GoBackToHome),
        tap(() => this._navCtrl.back())
    ), { dispatch: false});

    openAddItemListRoute$ = createEffect(() => this._actions$.pipe(
        ofType(OpenAddItemList),
        tap(() => this._navCtrl.navigateForward(['add-list']))
    ), { dispatch: false });

    openAddItemToListHeader$ = createEffect(() => this._actions$.pipe(
        ofType(OpenAddItemList),
        map(action => SetHeader({headerData: action.headerData}))
    ));

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

}