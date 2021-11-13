import { Pipe, PipeTransform } from '@angular/core';
import { CurrentGroceryItem, GroceryItem } from 'libs/grocery-shared-business-logic/src/lib/state/app-state.interface';

@Pipe({
  name: 'currentItem',
  pure: true
})
export class CurrentItemPipe implements PipeTransform {

  transform(allItems: GroceryItem[] | CurrentGroceryItem[]): CurrentGroceryItem[] {
    return allItems.filter(item => !!(item as CurrentGroceryItem).id) as CurrentGroceryItem[];
  }

}
