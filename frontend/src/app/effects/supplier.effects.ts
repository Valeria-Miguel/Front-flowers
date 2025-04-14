import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SuppliersService } from '../services/supplier.service';
import * as SuppliersActions from '../actions/supplier.actions';

export const loadSuppliers$ = createEffect(
  (actions$ = inject(Actions), suppliersService = inject(SuppliersService)) => {
    return actions$.pipe(
      ofType(SuppliersActions.loadSuppliers),
      exhaustMap(() =>
        suppliersService.getSuppliers().pipe(
          map(suppliers => SuppliersActions.loadSuppliersSuccess({ suppliers })),
          catchError(error => of(SuppliersActions.loadSuppliersFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const createSupplier$ = createEffect(
  (actions$ = inject(Actions), suppliersService = inject(SuppliersService)) => {
    return actions$.pipe(
      ofType(SuppliersActions.createSupplier),
      exhaustMap(({ supplier }) =>
        suppliersService.createSupplier(supplier).pipe(
          map(supplier => SuppliersActions.createSupplierSuccess({ supplier })),
          catchError(error => of(SuppliersActions.createSupplierFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const updateSupplier$ = createEffect(
  (actions$ = inject(Actions), suppliersService = inject(SuppliersService)) => {
    return actions$.pipe(
      ofType(SuppliersActions.updateSupplier),
      exhaustMap(({ id, supplier }) =>
        suppliersService.updateSupplier(id, supplier).pipe(
          map(supplier => SuppliersActions.updateSupplierSuccess({ supplier })),
          catchError(error => of(SuppliersActions.updateSupplierFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteSupplier$ = createEffect(
  (actions$ = inject(Actions), suppliersService = inject(SuppliersService)) => {
    return actions$.pipe(
      ofType(SuppliersActions.deleteSupplier),
      exhaustMap(({ id }) =>
        suppliersService.deleteSupplier(id).pipe(
          map(() => SuppliersActions.deleteSupplierSuccess({ id })),
          catchError(error => of(SuppliersActions.deleteSupplierFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const suppliersEffects = {
  loadSuppliers$,
  createSupplier$,
  updateSupplier$,
  deleteSupplier$
};