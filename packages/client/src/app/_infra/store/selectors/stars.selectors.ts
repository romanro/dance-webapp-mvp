import { createSelector } from '@ngrx/store';

import { StarsState } from '../state';

export const selectStars = (state: StarsState) => state.stars;

export const selectStarById = (id) => createSelector(
    selectStars, (allStars) => {
        if (allStars) {
            return allStars['stars'].find(star => star.id === id);
        } else {
            return {};
        }
    }
);
