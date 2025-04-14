import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlowersState } from '../states/flowers.state';

export const selectFlowersState = createFeatureSelector<FlowersState>('flowers');

export const selectAllFlowers = createSelector(
  selectFlowersState,
  (state: FlowersState) => state.flowers
);

export const selectFlowersLoading = createSelector(
  selectFlowersState,
  (state: FlowersState) => state.loading
);

export const selectFlowersError = createSelector(
  selectFlowersState,
  (state: FlowersState) => state.error
);