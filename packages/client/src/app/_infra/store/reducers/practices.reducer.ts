import { Action, createReducer, on } from '@ngrx/store';

import * as PracticesActions from '../actions/practices.actions';
import { initializePracticesState, PracticesState } from '../state';

export const initialPracticesState = initializePracticesState();

const reducer = createReducer(
    initialPracticesState,
    on(PracticesActions.GetPracticesAction, state => state),

    on(PracticesActions.SuccessGetPracticesAction, (state: PracticesState, { payload }) => {
        return { ...state, practices: payload, error: null };
    }),

    on(PracticesActions.ErrorPracticesAction, (state: PracticesState, error: Error) => {
        return { ...state, error };
    })
);


export function PracticesReducer(state: PracticesState | undefined, action: Action) {
    return reducer(state, action);
}
