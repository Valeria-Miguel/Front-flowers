import { Order } from '../models/order.model';

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialOrdersState: OrdersState = {
  orders: [],
  loading: false,
  loaded: false,
  error: null
};

