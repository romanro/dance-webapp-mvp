import { Action, createReducer, on } from '@ngrx/store';

import * as SkillsActions from '../actions/skills.actions';
import { initializeSkillsState, SkillsState } from '../state';


export const initialSkillsState = initializeSkillsState();

const reducer = createReducer(
    initialSkillsState,
    on(SkillsActions.GetSkillsAction, state => state),

    on(SkillsActions.SuccessGetSkillsAction, (state: SkillsState, { payload }) => {
        return { ...state, skills: payload };
    }),

    on(SkillsActions.ErrorSkillsAction, (state: SkillsState, error: Error) => {
        console.log(error);
        return { ...state, skillsError: error };
    })
);

export function SkillsReducer(state: SkillsState | undefined, action: Action) {
    return reducer(state, action);
}
