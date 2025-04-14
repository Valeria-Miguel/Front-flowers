import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order.model';

export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ order: Order }>()
);
export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);
export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>()
);

export const updateOrder = createAction(
  '[Orders] Update Order',
  props<{ id: number; order: Order }>()
);
export const updateOrderSuccess = createAction(
  '[Orders] Update Order Success',
  props<{ order: Order }>()
);
export const updateOrderFailure = createAction(
  '[Orders] Update Order Failure',
  props<{ error: string }>()
);

export const deleteOrder = createAction(
  '[Orders] Delete Order',
  props<{ id: number }>()
);
export const deleteOrderSuccess = createAction(
  '[Orders] Delete Order Success',
  props<{ id: number }>()
);
export const deleteOrderFailure = createAction(
  '[Orders] Delete Order Failure',
  props<{ error: string }>()
);