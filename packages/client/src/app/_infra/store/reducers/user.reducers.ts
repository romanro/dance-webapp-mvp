import { User } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { UserState } from '../state';



export const intialState = { user: null };

const reducer = createReducer(
  intialState,
  on(UserActions.GetUserAction, state => state),
  /*   on(UserActions.ClearUser, state => state),
    on(UserActions.UpdateUserAction, (state: UserState, { user }) => ({
      ...state, user: { ...user }
    })),
    on(UserActions.CreateUserAction, (state: UserState, { user }) => ({
      ...state, user: { ...user }
    })), */
  on(UserActions.SuccessGetUserAction, (state: UserState, { payload }) => {
    return { ...state, user: payload };
  }),

  on(UserActions.ErrorUserAction, (state: UserState, error: Error) => {
    console.log(error);
    return { ...state, starsError: error };
  })
);


export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
