import { createSelector } from '@ngrx/store';
import t from 'typy';

import { FiguresState } from '../state';


export const selectFigures = (state: FiguresState) => state.figures;

export const selectAllFiguresByStar = (starId: string) => createSelector(
    selectFigures, (allFigures) => {
        if (!t(allFigures, 'figures').isNullOrUndefined) {
            return t(allFigures, 'figures').safeArray.filter(figure => figure.stars.includes(starId));
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
