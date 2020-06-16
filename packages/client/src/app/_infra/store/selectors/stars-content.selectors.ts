import { createSelector } from '@ngrx/store';
import t from 'typy';

import { StarContentState } from '../state';

export const selectStarsContent = (state: StarContentState) => state.starsContent;

export const selectStarContentById = (id) => createSelector(
    selectStarsContent, (allStarsContent) => {
        console.log('allStarsContent:', allStarsContent)
        if (!t(allStarsContent, 'starsContent').isNullOrUndefined) {
            return t(allStarsContent, 'starsContent').safeArray[0];
        } else {
            return null;
        }
    }
);

export const selectStarsContentError = () => createSelector(
    selectStarsContent, (result) => {
        if (result) {
            return t(result, 'error').safeObject;
        } else {
            return null;
        }
    }
);