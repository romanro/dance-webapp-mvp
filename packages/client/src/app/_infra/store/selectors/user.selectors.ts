import { createSelector } from '@ngrx/store';

import { UserState } from '../state';


export const selectUser = (state: UserState) => state.user;

export const selectCurrentUser = () => createSelector(
    selectUser, (result) => {
        if (result) {
            return result['user'];
        } else {
            return null;
        }
    }
);
