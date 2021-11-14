export interface AppState {
  allItems: GroceryItem[];
  headerData?: HeaderData;
}

export interface HeaderData {
  title: string;
  buttons: {
    button: {
      name?: string;
      text?: string;
    }[];
    isBack?: boolean;
    position: HeaderButtonPosition;
  };
}

export enum HeaderButtonPosition {
  START = 'start',
  END = 'end',
}

export interface GroceryItem {
  name: string;
  category: GroceryItemCategoryType;
}

export interface CurrentGroceryItem extends GroceryItem {
  id: string;
  datePurchased: string;
}

export enum GroceryItemCategoryType {
  MEAT = 'Meat',
  FRUIT = 'Fruit',
  VEGETABLES = 'Vegetables',
  SNACKS = 'Snacks',
  DESSERTS = ' Desserts',
}
