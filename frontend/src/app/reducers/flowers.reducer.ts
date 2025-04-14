import { createReducer, on } from '@ngrx/store';
import { FlowersState, initialFlowersState } from '../states/flowers.state';
import * as FlowersActions from '../actions/flowers.actions';

export const flowersReducer = createReducer(
  initialFlowersState,

  on(FlowersActions.loadFlowers, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(FlowersActions.loadFlowersSuccess, (state, { flowers }) => ({
    ...state,
    flowers,
    loading: false,
    loaded: true,
    error: null
  })),
  on(FlowersActions.loadFlowersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(FlowersActions.createFlower, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FlowersActions.createFlowerSuccess, (state, { flower }) => ({
    ...state,
    flowers: [...state.flowers, flower],
    loading: false,
    error: null
  })),
  on(FlowersActions.createFlowerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(FlowersActions.updateFlower, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FlowersActions.updateFlowerSuccess, (state, { flower }) => ({
    ...state,
    flowers: state.flowers.map(f => (f.id === flower.id ? flower : f)),
    loading: false,
    error: null
  })),
  on(FlowersActions.updateFlowerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(FlowersActions.deleteFlower, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FlowersActions.deleteFlowerSuccess, (state, { id }) => ({
    ...state,
    flowers: state.flowers.filter(f => f.id !== id),
    loading: false,
    error: null
  })),
  on(FlowersActions.deleteFlowerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);