import { createReducer, on } from '@ngrx/store';
import { OrdersState, initialOrdersState } from '../states/orders.state';
import * as OrdersActions from '../actions/orders.actions';

export const ordersReducer = createReducer(
  initialOrdersState,

  on(OrdersActions.loadOrders, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
    loaded: true,
    error: null
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(OrdersActions.createOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    loading: false,
    error: null
  })),
  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrdersActions.updateOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.updateOrderSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map(o => (o.id === order.id ? order : o)),
    loading: false,
    error: null
  })),
  on(OrdersActions.updateOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrdersActions.deleteOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.deleteOrderSuccess, (state, { id }) => ({
    ...state,
    orders: state.orders.filter(o => o.id !== id),
    loading: false,
    error: null
  })),
  on(OrdersActions.deleteOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);