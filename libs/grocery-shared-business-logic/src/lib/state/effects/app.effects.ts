import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from "rxjs/operators";
import { GoBackToHome, OpenAddItemList, OpenItemDetail, SetHeader } from "../actions/app.actions";

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

}