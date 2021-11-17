import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-list',
    loadChildren: () =>
      import('./add-list/add-list.module').then((m) => m.IonicAddListModule),
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./item-detail/item-detail.module').then(m => m.ItemDetailModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
