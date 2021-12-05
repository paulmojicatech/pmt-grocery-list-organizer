import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from "rxjs/operators";
import { AddItem, GoBackToHome, OpenAddItemList, OpenItemDetail, SetHeader, SwitchHomeView } from "../actions/app.actions";

export abstract class AppEffects {
    constructor(protected _actions$: Actions){}

    addItemToStorage$ = createEffect(
        () => this._actions$.pipe(
            ofType(AddItem),

        )
    )

    openItemDetailHeader$ = createEffect(() => this._actions$.pipe(
        ofType(OpenItemDetail),
        map(action => {
            return SetHeader({headerData: action.headerData})
        })
    ));

    goBackToHomeHeader$ = createEffect(() => this._actions$.pipe(
        ofType(GoBackToHome),
        map(action => SetHeader({headerData: action.headerData}))
    ));

    openAddItemToListHeader$ = createEffect(() => this._actions$.pipe(
        ofType(OpenAddItemList),
        map(action => SetHeader({headerData: action.headerData}))
    ));

}