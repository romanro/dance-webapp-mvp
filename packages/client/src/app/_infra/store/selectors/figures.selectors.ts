import { createSelector } from '@ngrx/store';
import t from 'typy';

import { FiguresState } from '../state';
import { Practice } from '@app/_infra/core/models';

export const selectFigures = (state: FiguresState) => state.figures;

export const selectAllFiguresSorted = (level, danceType) => createSelector(
    selectFigures, (allFigures) => {
        console.log('allFigures:', allFigures)
        if (!t(allFigures, 'practices').isNullOrUndefined) {
            return t(allFigures, 'practices').safeArray.slice().sort((figure1, figure2) => figure1.currentChallenge ? -1 : 1);
        } else {
            return null;
        }
    }
)


export const selectFiguresError = () => createSelector(
    selectFigures, (result) => {
        if (result) {
            return t(result, 'error').safeObject;
        } else {
            return null;
        }
    }
);
