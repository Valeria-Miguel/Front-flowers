import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import * as UsersActions from '../actions/users.actions';

export const loadUsers$ = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        usersService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const createUser$ = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(UsersActions.createUser),
      exhaustMap(({ user }) =>
        usersService.createUser(user).pipe(
          map(user => UsersActions.createUserSuccess({ user })),
          catchError(error => of(UsersActions.createUserFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const updateUser$ = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(UsersActions.updateUser),
      exhaustMap(({ id, user }) =>
        usersService.updateUser(id, user).pipe(
          map(user => UsersActions.updateUserSuccess({ user })),
          catchError(error => of(UsersActions.updateUserFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteUser$ = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      exhaustMap(({ id }) =>
        usersService.deleteUser(id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError(error => of(UsersActions.deleteUserFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);

export const usersEffects = {
  loadUsers$,
  createUser$,
  updateUser$,
  deleteUser$
};