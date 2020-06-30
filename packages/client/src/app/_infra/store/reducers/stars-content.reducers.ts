import { Action, createReducer, on } from '@ngrx/store';

import * as StarsContentActions from '../actions/stars-content.actions';
import { initializeStarContentState, StarContentState } from '../state';
import { stat } from 'fs';


export const initialStarContentState = initializeStarContentState();

const reducer = createReducer(
    initialStarContentState,
    on(StarsContentActions.GetStarsContentAction, state => state),

    on(StarsContentActions.SuccessGetStarsContentAction, (state: StarContentState, { payload }) => {
        // console.log('payload:', payload)
        // let test=[];
        // if(!state.starsContent){
        //     console.log(111111111)
        //     return { ...state, starsContent: payload, error: null };

        // }
        // else{
        //     console.log(22222222)
        //     console.log("state.startcontent", state.starsContent)
        //     test.push(payload)
        //     return { ...state, starsContent: test, error: null };

        // }
            return { ...state, starsContent: [...state.starsContent, payload], error: null };


    }),
    // return { ...state, book: action.payload.data };

    on(StarsContentActions.ErrorStarsContentAction, (state: StarContentState, error: Error) => {
        return { ...state, error };
    })
);

export function StarsContentReducer(state: StarContentState | undefined, action: Action) {
    return reducer(state, action);
}
