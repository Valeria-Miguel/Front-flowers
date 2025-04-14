import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import * as OrdersActions from '../actions/orders.actions';

export const loadOrders$ = createEffect(
  (actions$ = inject(Actions), ordersService = inject(OrdersService)) => {
    return actions$.pipe(
      ofType(OrdersActions.loadOrders),
      exhaustMap(() =>
        ordersService.getOrders().pipe(
          map(orders => OrdersActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const createOrder$ = createEffect(
  (actions$ = inject(Actions), ordersService = inject(OrdersService)) => {
    return actions$.pipe(
      ofType(OrdersActions.createOrder),
      exhaustMap(({ order }) =>
        ordersService.createOrder(order).pipe(
          map(order => OrdersActions.createOrderSuccess({ order })),
          catchError(error => of(OrdersActions.createOrderFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const updateOrder$ = createEffect(
  (actions$ = inject(Actions), ordersService = inject(OrdersService)) => {
    return actions$.pipe(
      ofType(OrdersActions.updateOrder),
      exhaustMap(({ id, order }) =>
        ordersService.updateOrder(id, order).pipe(
          map(order => OrdersActions.updateOrderSuccess({ order })),
          catchError(error => of(OrdersActions.updateOrderFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteOrder$ = createEffect(
  (actions$ = inject(Actions), ordersService = inject(OrdersService)) => {
    return actions$.pipe(
      ofType(OrdersActions.deleteOrder),
      exhaustMap(({ id }) =>
        ordersService.deleteOrder(id).pipe(
          map(() => OrdersActions.deleteOrderSuccess({ id })),
          catchError(error => of(OrdersActions.deleteOrderFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const ordersEffects = {
  loadOrders$,
  createOrder$,
  updateOrder$,
  deleteOrder$
};