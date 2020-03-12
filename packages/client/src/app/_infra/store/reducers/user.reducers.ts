import { User } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { UserState } from '../state';



export const intialState = { user: null, error: null };

const reducer = createReducer(
  intialState,
  on(UserActions.GetUserAction, state => state),

  on(UserActions.SuccessGetUserAction, (state: UserState, { payload }) => {
    return { ...state, user: payload, error: null };
  }),

  on(UserActions.ErrorGetUserAction, (state: UserState, error: Error) => {
    console.error(error);
    return { ...state, error };
  }),

  on(UserActions.UpdateUserAction, state => state),

  on(UserActions.SuccessUpdateUserAction, (state: UserState, { payload }) => {
    return { ...state, user: payload, error: null };
  }),

  on(UserActions.ErrorUpdateUserAction, (state: UserState, error: Error) => {
    console.error(error);
    return { ...state, error };
  }),

  on(UserActions.ErrorUserAction, (state: UserState, error: Error) => {
    console.error(error);
    return { ...state, error };
  })
);


export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
