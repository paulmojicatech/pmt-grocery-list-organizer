import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from "./reducers/app.reducer";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(AppReducer),
        EffectsModule.forRoot([]),
    ],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class RootStateModule{}