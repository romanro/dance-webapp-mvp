import { ActionReducer, createReducer, on } from '@ngrx/store';

import * as GlobalActions from '../actions/global.actions';
import { initializeGlobalState } from '../state';


export const initialGlobalState = initializeGlobalState();

const reducer = createReducer(
    initialGlobalState,
    on(GlobalActions.Logout, state => {
        return { ...initialGlobalState };
    })
);

export function GlobalReducer(reducer): ActionReducer<any, any> {
    return (state, action) => {
        return reducer(state, action);
    };
}

