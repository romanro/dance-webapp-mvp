import { Action, createReducer, on } from '@ngrx/store';

import * as FiguresActions from '../actions/figures.actions';
import { initializeFiguresState } from '../state';
import { FiguresState } from './../state';



export const initialFiguresState = initializeFiguresState();

const reducer = createReducer(
    initialFiguresState,
    on(FiguresActions.GetFiguresAction, state => state),

    on(FiguresActions.SuccessGetFiguresAction, (state: FiguresState, { payload }) => {
        return { ...state, figures: payload };
    }),

    on(FiguresActions.ErrorGetFiguresAction, (state: FiguresState, error: Error) => {
        console.log(error);
        return { ...state, figuresError: error };
    })
);

export function FiguresReducer(state: FiguresState | undefined, action: Action) {
    return reducer(state, action);
}
