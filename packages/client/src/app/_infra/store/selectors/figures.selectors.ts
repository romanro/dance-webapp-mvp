import { createSelector } from '@ngrx/store';
import t from 'typy';

import { FiguresState } from '../state';
import { Figure } from '@app/_infra/core/models';

export const selectFigures = (state: FiguresState) => state.figures;

export const selectAllFiguresSorted = (level, danceType) => createSelector(
    selectFigures, (allFigures) => {
        if (!t(allFigures, 'figures').isNullOrUndefined) {
            if(allFigures['figures']['figures'][0]){
                // console.log('allFigures:', allFigures['figures']['figures'][0]['type'] === danceType)
                // console.log('danceType:', danceType)
                // console.log( allFigures['figures']['figures'][0]['type'])
            }
          

            return t(allFigures, 'figures').safeArray;
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
