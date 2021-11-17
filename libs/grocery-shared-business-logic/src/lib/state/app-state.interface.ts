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
  id?: string;
  datePurchased?: string;
  name: string;
  category: GroceryItemCategoryType;
}


export enum GroceryItemCategoryType {
  MEAT = 'Meat',
  FRUIT = 'Fruit',
  VEGETABLES = 'Vegetables',
  SNACKS = 'Snacks',
  DESSERTS = ' Desserts',
}
