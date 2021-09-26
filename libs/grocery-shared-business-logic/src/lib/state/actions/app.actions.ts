import { createAction, props } from '@ngrx/store';

export const SET_IS_LOADING = '[APP] Set Is Loading';
export const SET_EXIPRING_ITEMS = '[APP]';

export const SetIsLoading = createAction(
  SET_IS_LOADING,
  props<{ isLoading: boolean }>()
);

export const SetExpiringItems = createAction(
  SET_EXIPRING_ITEMS,
  props<{ expiringItems: { title: string; datePurchased: string }[] }>()
);
