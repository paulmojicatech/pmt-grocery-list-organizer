export interface AppState {
  isLoading: boolean;
  expiringItems: { title: string; datePurchased: string }[];
  headerData?: HeaderData;
}

export interface HeaderData {
  title: string;
  buttons: {
    button: {
        name?: string;
        text?: string;
    }[],
    position: HeaderButtonPosition;
  }
}

export enum HeaderButtonPosition {
    START = 'start',
    END = 'end'
}
