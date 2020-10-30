import { createSelector } from '@ngrx/store';
import t from 'typy';

import { StarsState } from '../state';

export const selectStars = (state: StarsState) => state.stars;

export const selectAllStars = () => createSelector(
    selectStars, allStars => {
        return !t(allStars, 'stars').isNullOrUndefined ? t(allStars, 'stars').safeObject : null
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
        return result ? t(result, 'error').safeObject : null
    }
);
