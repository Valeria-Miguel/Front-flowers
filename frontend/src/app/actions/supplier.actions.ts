import { createAction, props } from '@ngrx/store';
import { Supplier } from '../models/supplier.model';

export const loadSuppliers = createAction('[Suppliers] Load Suppliers');
export const loadSuppliersSuccess = createAction(
  '[Suppliers] Load Suppliers Success',
  props<{ suppliers: Supplier[] }>()
);
export const loadSuppliersFailure = createAction(
  '[Suppliers] Load Suppliers Failure',
  props<{ error: string }>()
);

export const createSupplier = createAction(
  '[Suppliers] Create Supplier',
  props<{ supplier: Supplier }>()
);
export const createSupplierSuccess = createAction(
  '[Suppliers] Create Supplier Success',
  props<{ supplier: Supplier }>()
);
export const createSupplierFailure = createAction(
  '[Suppliers] Create Supplier Failure',
  props<{ error: string }>()
);

export const updateSupplier = createAction(
  '[Suppliers] Update Supplier',
  props<{ id: number; supplier: Supplier }>()
);
export const updateSupplierSuccess = createAction(
  '[Suppliers] Update Supplier Success',
  props<{ supplier: Supplier }>()
);
export const updateSupplierFailure = createAction(
  '[Suppliers] Update Supplier Failure',
  props<{ error: string }>()
);

export const deleteSupplier = createAction(
  '[Suppliers] Delete Supplier',
  props<{ id: number }>()
);
export const deleteSupplierSuccess = createAction(
  '[Suppliers] Delete Supplier Success',
  props<{ id: number }>()
);
export const deleteSupplierFailure = createAction(
  '[Suppliers] Delete Supplier Failure',
  props<{ error: string }>()
);