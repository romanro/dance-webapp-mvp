import { createAction, props } from '@ngrx/store';
import { Dance, StarDanceLevel, Figure } from '@core/models';

export enum FiguresActionType {
    GetFiguresAction = '[figures] - Get figures',
    BeginGetFiguresAction = '[figures] - Begin Get figures',
    SuccessGetFiguresAction = '[figures] - Success Get figures',
    ErrorFiguresAction = '[figures] - Error'
}


export const GetFiguresAction = createAction(FiguresActionType.GetFiguresAction);

export const BeginGetFiguresAction = createAction(FiguresActionType.BeginGetFiguresAction,
    props<{ level: StarDanceLevel, danceType: Dance }>()
    );
export const SuccessGetFiguresAction = createAction(
    FiguresActionType.SuccessGetFiguresAction,
    props<{ payload: Figure[] }>()

);

export const ErrorFiguresAction = createAction(FiguresActionType.ErrorFiguresAction, props<Error>());

