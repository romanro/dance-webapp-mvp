import { Figure } from '@core/models';
import { createAction, props } from '@ngrx/store';

export enum FiguresActionType {
    GetFiguresAction = '[figures] - Get figures',
    BeginGetStarFiguresAction = '[figures] - Begin Get Star figures',
    SuccessGetStarFiguresAction = '[figures] - Success Get Star figures',
    UpdateFiguresAction = '[figures] - Update figures',
    ErrorFiguresAction = '[figures] - Error'
}


export const GetFiguresAction = createAction(FiguresActionType.GetFiguresAction);

export const BeginGetStarFiguresAction = createAction(FiguresActionType.BeginGetStarFiguresAction,
    props<{ payload: string }>()
);
export const SuccessGetStarFiguresAction = createAction(
    FiguresActionType.SuccessGetStarFiguresAction,
    props<{ payload: Figure[] }>()

);


export const ErrorFiguresAction = createAction(FiguresActionType.ErrorFiguresAction, props<Error>());

