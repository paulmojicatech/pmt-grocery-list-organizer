import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { RootStateModule } from '../../../../libs/grocery-shared-business-logic/src/lib/state/state.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RootStateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
