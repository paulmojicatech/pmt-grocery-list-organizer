import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThingsWeNeedPage } from './things-we-need.page';
import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ThingsWeNeedPage
  }
]

@NgModule({
  declarations: [
    ThingsWeNeedPage
  ],
  imports: [
    CommonModule
  ]
})
export class ThingsWeNeedModule { }
