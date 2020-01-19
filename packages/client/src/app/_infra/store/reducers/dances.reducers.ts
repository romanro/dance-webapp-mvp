import { Action, createReducer, on } from '@ngrx/store';

import * as DancesActions from '../actions/dances.actions';
import { initializeDancesState } from '../state';
import { DancesState } from './../state';


export const initialDancesState = initializeDancesState();

const reducer = createReducer(
    initialDancesState,
    on(DancesActions.GetDancesAction, state => state),

    on(DancesActions.SuccessGetDancesAction, (state: DancesState, { payload }) => {
        return { ...state, dances: payload };
    }),

    on(DancesActions.ErrorDancesAction, (state: DancesState, error: Error) => {
        console.log(error);
        return { ...state, dancesError: error };
    })
);

export function DancesReducer(state: DancesState | undefined, action: Action) {
    return reducer(state, action);
}
