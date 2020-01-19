import { Dance } from '@core/models/dance.model';
import { createAction, props } from '@ngrx/store';

export const GetDancesAction = createAction('[dances] - Get dances');

export const BeginGetDancesAction = createAction('[dances] - Begin Get dances');

export const SuccessGetDancesAction = createAction(
    '[dances] - Success Get dances',
    props<{ payload: Dance[] }>()
);

export const ErrorDancesAction = createAction('[dances] - Error', props<Error>());