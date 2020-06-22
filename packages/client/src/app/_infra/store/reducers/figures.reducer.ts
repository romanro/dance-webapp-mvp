import { Action, createReducer, on } from '@ngrx/store';

import * as FiguresActions from '../actions/figures.actions';
import { initializeFiguresState, FiguresState } from '../state';

export const initialFiguresState = initializeFiguresState();

const reducer = createReducer(
    initialFiguresState,
    on(FiguresActions.GetFiguresAction, state => state),

    on(FiguresActions.SuccessGetFiguresAction, (state: FiguresState, { payload }) => {
        return { ...state, figures: payload, error: null };
    }),

    on(FiguresActions.ErrorFiguresAction, (state: FiguresState, error: Error) => {
        return { ...state, error };
    })
);


export function FiguresReducer(state: FiguresState | undefined, action: Action) {
    return reducer(state, action);
}
