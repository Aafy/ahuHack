import { createAction, props } from '@ngrx/store';
import { IOrderEntry } from './order-entry.model';

export const saveOrderEntries = createAction(
  '[Order Entry] Save Order Entries',
  props<{ orderEntry: IOrderEntry }>()
);
