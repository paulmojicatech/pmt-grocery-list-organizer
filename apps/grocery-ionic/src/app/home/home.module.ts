import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { GrocerySharedComponentsModule } from 'libs/grocery-shared-components/src/index';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, IonicModule, GrocerySharedComponentsModule, HomeRoutingModule],
  declarations: [HomePage],
})
export class HomeModule {}
