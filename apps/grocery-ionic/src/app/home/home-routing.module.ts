import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
