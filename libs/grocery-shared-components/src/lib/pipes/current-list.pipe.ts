import { Pipe, PipeTransform } from '@angular/core';
import { GroceryItem } from 'libs/grocery-shared-business-logic/src/lib/state/app-state.interface';

@Pipe({
  name: 'currentList',
  pure: true
})
export class CurrentListPipe implements PipeTransform {

  transform(
    allItems: GroceryItem[]
  ): GroceryItem[] {
    return allItems.filter(
      (item) => !!item?.id
    );
  }

}
