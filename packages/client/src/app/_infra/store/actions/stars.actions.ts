import { Star } from '@core/models/';
import { createAction, props } from '@ngrx/store';

export const GetStarsAction = createAction('[stars] - Get stars');

export const BeginGetStarsAction = createAction('[stars] - Begin Get stars');

export const SuccessGetStarsAction = createAction(
    '[stars] - Success Get stars',
    props<{ payload: Star[] }>()
);

export const ErrorStarsAction = createAction('[stars] - Error', props<Error>());
