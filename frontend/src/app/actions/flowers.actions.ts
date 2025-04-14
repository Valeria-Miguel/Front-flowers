import { createAction, props } from '@ngrx/store';
import { Flower } from '../models/flower.model';

export const loadFlowers = createAction('[Flowers] Load Flowers');
export const loadFlowersSuccess = createAction(
  '[Flowers] Load Flowers Success',
  props<{ flowers: Flower[] }>()
);
export const loadFlowersFailure = createAction(
  '[Flowers] Load Flowers Failure',
  props<{ error: string }>()
);

export const createFlower = createAction(
  '[Flowers] Create Flower',
  props<{ flower: Flower }>()
);
export const createFlowerSuccess = createAction(
  '[Flowers] Create Flower Success',
  props<{ flower: Flower }>()
);
export const createFlowerFailure = createAction(
  '[Flowers] Create Flower Failure',
  props<{ error: string }>()
);

export const updateFlower = createAction(
  '[Flowers] Update Flower',
  props<{ id: number; flower: Flower }>()
);
export const updateFlowerSuccess = createAction(
  '[Flowers] Update Flower Success',
  props<{ flower: Flower }>()
);
export const updateFlowerFailure = createAction(
  '[Flowers] Update Flower Failure',
  props<{ error: string }>()
);

export const deleteFlower = createAction(
  '[Flowers] Delete Flower',
  props<{ id: number }>()
);
export const deleteFlowerSuccess = createAction(
  '[Flowers] Delete Flower Success',
  props<{ id: number }>()
);
export const deleteFlowerFailure = createAction(
  '[Flowers] Delete Flower Failure',
  props<{ error: string }>()
);