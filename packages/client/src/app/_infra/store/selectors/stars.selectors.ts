import { createSelector } from '@ngrx/store';
import t from 'typy';

import { StarsState } from '../state';

export const selectStars = (state: StarsState) => state.stars;

export const selectAllStars = () => createSelector(
    selectStars, (allStars) => {
        if (!t(allStars, 'stars').isNullOrUndefined) {
            return t(allStars, 'stars').safeObject;
        } else {
            return null;
        }
    }
)

export const selectStarBySlug = (slug: string) => createSelector(
    selectStars, (allStars) => {
        if (!t(allStars, 'stars').isNullOrUndefined) {
            return t(allStars, 'stars').safeArray.find(star => star.slug === slug);
        } else {
            return null;
        }
    }
)

export const selectStarsError = () => createSelector(
    selectStars, (result) => {
        if (result) {
            return t(result, 'error').safeObject;
        } else {
            return null;
        }
    }
);
