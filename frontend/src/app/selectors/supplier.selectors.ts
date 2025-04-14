import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuppliersState } from '../states/supplier.state';

export const selectSuppliersState = createFeatureSelector<SuppliersState>('suppliers');

export const selectAllSuppliers = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.suppliers
);

export const selectSuppliersLoading = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.loading
);

export const selectSuppliersError = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.error
);