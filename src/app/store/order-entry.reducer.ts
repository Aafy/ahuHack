import { createReducer, on } from '@ngrx/store';
import { IOrderEntryState } from './order-entry.model';
import { saveOrderEntries } from './order-entry.actions';

export const initialState: IOrderEntryState = {
  orderEntries: [],
};

export const orderEntryReducer = createReducer(
  initialState,
  on(saveOrderEntries, (state, { orderEntry }) => ({
    ...state,
    orderEntries: [...state.orderEntries, orderEntry],
  }))
);
