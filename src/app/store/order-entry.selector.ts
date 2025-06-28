import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IOrderEntryState } from './order-entry.model';

export const selectOrderEntryState =
  createFeatureSelector<IOrderEntryState>('orderEntries');

export const selectOrderEntries = createSelector(
  selectOrderEntryState,
  (state) => state.orderEntries
);
