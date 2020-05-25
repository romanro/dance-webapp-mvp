import { Practice } from '@core/models/';
import { createAction, props } from '@ngrx/store';

export enum PracticesActionType {
    GetPracticesAction = '[practices] - Get practices',
    BeginGetPracticesAction = '[practices] - Begin Get practices',
    SuccessGetPracticesAction = '[practices] - Success Get practices',
    ErrorPracticesAction = '[practices] - Error'
}


export const GetPracticesAction = createAction(PracticesActionType.GetPracticesAction);

export const BeginGetPracticesAction = createAction(PracticesActionType.BeginGetPracticesAction);

export const SuccessGetPracticesAction = createAction(
    PracticesActionType.SuccessGetPracticesAction,
    props<{ payload: Practice[] }>()

);

export const ErrorPracticesAction = createAction(PracticesActionType.ErrorPracticesAction, props<Error>());

