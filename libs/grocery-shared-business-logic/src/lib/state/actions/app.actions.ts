import { createAction, props } from '@ngrx/store';
import { HeaderData } from '../app-state.interface';

export const SET_IS_LOADING = '[APP] Set Is Loading';
export const SET_EXIPRING_ITEMS = '[APP] Set Expiring Items';
export const SET_HEADER = '[APP] Set Header';

export const SetIsLoading = createAction(
  SET_IS_LOADING,
  props<{ isLoading: boolean }>()
);

export const SetExpiringItems = createAction(
  SET_EXIPRING_ITEMS,
  props<{ expiringItems: { title: string; datePurchased: string }[] }>()
);

export const SetHeader = createAction(
    SET_HEADER,
    props<{headerData: HeaderData}>()
);
