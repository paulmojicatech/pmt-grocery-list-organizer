import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
