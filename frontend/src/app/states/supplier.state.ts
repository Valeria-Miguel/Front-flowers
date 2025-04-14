import { Supplier } from '../models/supplier.model';

export interface SuppliersState {
  suppliers: Supplier[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialSuppliersState: SuppliersState = {
  suppliers: [],
  loading: false,
  loaded: false,
  error: null
};