import { createReducer, on } from '@ngrx/store';
import { SuppliersState, initialSuppliersState } from '../states/supplier.state';
import * as SuppliersActions from '../actions/supplier.actions';

export const suppliersReducer = createReducer(
  initialSuppliersState,

  on(SuppliersActions.loadSuppliers, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(SuppliersActions.loadSuppliersSuccess, (state, { suppliers }) => ({
    ...state,
    suppliers,
    loading: false,
    loaded: true,
    error: null
  })),
  on(SuppliersActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(SuppliersActions.createSupplier, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SuppliersActions.createSupplierSuccess, (state, { supplier }) => ({
    ...state,
    suppliers: [...state.suppliers, supplier],
    loading: false,
    error: null
  })),
  on(SuppliersActions.createSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SuppliersActions.updateSupplier, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SuppliersActions.updateSupplierSuccess, (state, { supplier }) => ({
    ...state,
    suppliers: state.suppliers.map(s => (s.id === supplier.id ? supplier : s)),
    loading: false,
    error: null
  })),
  on(SuppliersActions.updateSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SuppliersActions.deleteSupplier, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SuppliersActions.deleteSupplierSuccess, (state, { id }) => ({
    ...state,
    suppliers: state.suppliers.filter(s => s.id !== id),
    loading: false,
    error: null
  })),
  on(SuppliersActions.deleteSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);