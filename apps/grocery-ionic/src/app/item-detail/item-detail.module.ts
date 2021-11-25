import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailComponent } from './item-detail.component';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Route[] = [
  {
    path: ':id',
    pathMatch: 'full',
    component: ItemDetailComponent
  }
]

@NgModule({
  declarations: [
    ItemDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class ItemDetailModule { }
