import { Action, createReducer, on } from '@ngrx/store';

import * as StarsContentActions from '../actions/stars-content.actions';
import { initializeStarContentState, StarContentState } from '../state';


export const initialStarContentState = initializeStarContentState();

const reducer = createReducer(
    initialStarContentState,
    on(StarsContentActions.GetStarsContentAction, state => state),

    on(StarsContentActions.SuccessGetStarsContentAction, (state: StarContentState, { payload }) => {
        console.log(1111111111);
        return { ...state, starsContent: payload, error: null };
    }),

    on(StarsContentActions.ErrorStarsContentAction, (state: StarContentState, error: Error) => {
        console.error(error);
        console.log('ErrorStarsContentAction state:', state)

        return { ...state, error };
    })
);

export function StarsContentReducer(state: StarContentState | undefined, action: Action) {
    // console.log("state",state)
    return reducer(state, action);
}
