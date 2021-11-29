import { HomeViewType } from "./models/app.model";

export interface AppState {
  allItems: GroceryItem[];
  headerData?: HeaderData;
  currentHomeView: HomeViewType;
}

export enum HeaderType {
  HOME_HEADER,
  ADD_ITEM_HEADER,
  ITEM_DETAIL_HEADER,
  THINGS_WE_NEED_HEADER
}

export interface HeaderData {
  title: string;
  buttons: HeaderButton[];
  buttonGroupPosition: HeaderButtonPosition;
  subtitle?: string;
}

export interface HeaderButton {
  name?: string;
  text?: string;
  isBack?: boolean;
  route: string[];
  nextHeaderData: HeaderType;
}

export enum HeaderButtonPosition {
  START = 'start',
  END = 'end',
}

export interface GroceryItem {
  id?: string;
  datePurchased?: string;
  qty?: number;
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
