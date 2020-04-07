import { createSelector } from '@ngrx/store';
import t from 'typy';

import { StarsState } from '../state';

export const selectStars = (state: StarsState) => state.stars;

export const selectAllStarsSorted = () => createSelector(
    selectStars, (allStars) => {
        if (!t(allStars, 'stars').isNullOrUndefined) {
            return t(allStars, 'stars').safeArray.sort((star1, star2) => star1.currentChallenge ? -1 : 1);
        } else {
            return null;
        }
    }
)

export const selectStarById = (id) => createSelector(
    selectStars, (allStars) => {
        if (!t(allStars, 'stars').isNullOrUndefined) {
            return t(allStars, 'stars').safeArray.find(star => star.id === id);
        } else {
            return null;
        }
    }
);

export const selectStarsError = () => createSelector(
    selectStars, (result) => {
        if (result) {
            return t(result, 'error').safeObject;
        } else {
            return null;
        }
    }
);
