import { Figure } from '@core/models';
import { createAction, props } from '@ngrx/store';


export const GetFiguresAction = createAction('[figures] - Get figures');

export const BeginGetFiguresAction = createAction('[figures] - Begin Get figures');

export const SuccessGetFiguresAction = createAction(
    '[figures] - Success Get figures',
    props<{ payload: Figure[] }>()
);

export const ErrorGetFiguresAction = createAction('[figures] - Error', props<Error>());