import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThingsWeNeedPage } from './things-we-need.page';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

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
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ]
})
export class ThingsWeNeedModule { }
