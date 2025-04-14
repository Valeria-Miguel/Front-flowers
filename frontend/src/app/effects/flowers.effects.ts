import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { FlowersService } from '../services/flowers.service';
import * as FlowersActions from '../actions/flowers.actions';

export const loadFlowers$ = createEffect(
  (actions$ = inject(Actions), flowersService = inject(FlowersService)) => {
    return actions$.pipe(
      ofType(FlowersActions.loadFlowers),
      exhaustMap(() =>
        flowersService.getFlowers().pipe(
          map(flowers => FlowersActions.loadFlowersSuccess({ flowers })),
          catchError(error => of(FlowersActions.loadFlowersFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const createFlower$ = createEffect(
  (actions$ = inject(Actions), flowersService = inject(FlowersService)) => {
    return actions$.pipe(
      ofType(FlowersActions.createFlower),
      exhaustMap(({ flower }) =>
        flowersService.createFlower(flower).pipe(
          map(flower => FlowersActions.createFlowerSuccess({ flower })),
          catchError(error => of(FlowersActions.createFlowerFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const updateFlower$ = createEffect(
  (actions$ = inject(Actions), flowersService = inject(FlowersService)) => {
    return actions$.pipe(
      ofType(FlowersActions.updateFlower),
      exhaustMap(({ id, flower }) =>
        flowersService.updateFlower(id, flower).pipe(
          map(flower => FlowersActions.updateFlowerSuccess({ flower })),
          catchError(error => of(FlowersActions.updateFlowerFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteFlower$ = createEffect(
  (actions$ = inject(Actions), flowersService = inject(FlowersService)) => {
    return actions$.pipe(
      ofType(FlowersActions.deleteFlower),
      exhaustMap(({ id }) =>
        flowersService.deleteFlower(id).pipe(
          map(() => FlowersActions.deleteFlowerSuccess({ id })),
          catchError(error => of(FlowersActions.deleteFlowerFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const flowersEffects = {
  loadFlowers$,
  createFlower$,
  updateFlower$,
  deleteFlower$
};