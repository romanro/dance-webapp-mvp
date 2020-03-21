import { createSelector } from '@ngrx/store';

import { StarsState } from '../state';

export const selectStars = (state: StarsState) => state.stars;

export const selectAllStarsSorted = () => createSelector(
    selectStars, (allStars) => {
        if (allStars && allStars['stars']) {
            return allStars['stars'].sort((star1, star2) => star1.currentChallenge ? -1 : 1);
        } else {
            return null;
        }
    }
)

export const selectStarById = (id) => createSelector(
    selectStars, (allStars) => {
        if (allStars && allStars['stars']) {
            return allStars['stars'].find(star => star.id === id);
        } else {
            return null;
        }
    }
);

export const selectStarsError = () => createSelector(
    selectStars, (result) => {
        if (result) {
            return result['error'];
        } else {
            return null;
        }
    }
);
