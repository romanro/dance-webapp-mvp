import { User } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const GetUserAction = createAction('[User] - Get User');

// export const BeginGetUserAction = createAction('[User] - Begin Get User');

export const SuccessGetUserAction = createAction(
  '[User] - Success Get User',
  props<{ user: User }>()
);

export const ClearUser = createAction(
  '[User] - Clear User',
  props<{ null }>()
);

export const CreateUserAction = createAction(
  '[User] - Create User',
  props<{ user: User }>()
);

export const UpdateUserAction = createAction(
  '[User] - Update User',
  props<{ user: User }>()
);

// export const ErrorUserAction = createAction('[User] - Error', props<Error>());
