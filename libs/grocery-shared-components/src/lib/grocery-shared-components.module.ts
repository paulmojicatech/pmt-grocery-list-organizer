import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentListPipe } from './pipes/current-list.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CurrentListPipe
  ],
  exports: [
    CurrentListPipe
  ]
})
export class GrocerySharedComponentsModule {}
