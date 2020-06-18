import { Practice } from '@core/models/';
import { createAction, props } from '@ngrx/store';

export enum FiguresActionType {
    GetFiguresAction = '[figures] - Get figures',
    BeginGetFiguresAction = '[figures] - Begin Get figures',
    SuccessGetFiguresAction = '[figures] - Success Get figures',
    ErrorFiguresAction = '[figures] - Error'
}


export const GetFiguresAction = createAction(FiguresActionType.GetFiguresAction);

export const BeginGetFiguresAction = createAction(FiguresActionType.BeginGetFiguresAction,
    props<{ payload1: string, payload2: string }>()
    );
export const SuccessGetFiguresAction = createAction(
    FiguresActionType.SuccessGetFiguresAction,
    props<{ payload: Practice[] }>()

);

export const ErrorFiguresAction = createAction(FiguresActionType.ErrorFiguresAction, props<Error>());

