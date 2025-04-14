import { createReducer, on } from '@ngrx/store';
import { UsersState, initialUsersState } from '../states/users.state';
import * as UsersActions from '../actions/users.actions';

export const usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.loadUsers, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    loaded: true,
    error: null
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(UsersActions.createUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
    error: null
  })),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UsersActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u)),
    loading: false,
    error: null
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UsersActions.deleteUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id),
    loading: false,
    error: null
  })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);