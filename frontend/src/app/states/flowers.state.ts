import { Flower } from '../models/flower.model';

export interface FlowersState {
  flowers: Flower[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialFlowersState: FlowersState = {
  flowers: [],
  loading: false,
  loaded: false,
  error: null
};