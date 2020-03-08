import { User } from '@core/models';
import { createAction, props } from '@ngrx/store';



// export const BeginGetUserAction = createAction('[User] - Begin Get User');

/* export const ClearUser = createAction(
  '[user] - Clear user',
  props<{ null }>()
);

export const CreateUserAction = createAction(
  '[user] - Create user',
  props<{ user: User }>()
);

export const UpdateUserAction = createAction(
  '[user] - Update user',
  props<{ user: User }>()
); */

export const GetUserAction = createAction('[user] - Get user');

export const BeginGetUserAction = createAction('[user] - Begin Get user');

export const SuccessGetUserAction = createAction(
  '[user] - Success Get user',
  props<{ payload: User }>()
);

export const ErrorUserAction = createAction('[user] - Error', props<Error>());

/*
export const GetStarsAction = createAction('[stars] - Get stars');

export const BeginGetStarsAction = createAction('[stars] - Begin Get stars');

export const SuccessGetStarsAction = createAction(
    '[stars] - Success Get stars',
    props<{ payload: Star[] }>()
);

export const ErrorStarsAction = createAction('[stars] - Error', props<Error>()); */




