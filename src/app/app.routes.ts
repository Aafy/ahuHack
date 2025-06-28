import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'order-entry',
    loadComponent: () =>
      import('./components/order-entry/order-entry.component').then(
        (m) => m.OrderEntryComponent
      ),
  },
];
