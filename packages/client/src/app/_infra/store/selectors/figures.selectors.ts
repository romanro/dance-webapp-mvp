import { createSelector } from '@ngrx/store';
import t from 'typy';

import { FiguresState } from '../state';
import { Figure } from '@app/_infra/core/models';

export const selectFigures = (state: FiguresState) => state.figures;

export const selectAllFiguresSorted = (id) => createSelector(
    selectFigures, (allFigures) => {
        console.log('allFigures:', allFigures)
        if (!t(allFigures, 'figures').isNullOrUndefined) {
            let figuresAraay = [];
            allFigures['figures'].forEach(figure => {
                figure['stars'].forEach(starId => {
                    if (starId === id) {
                        figuresAraay.push(figure)
                    }
                })

            })
            return t(figuresAraay).safeArray;

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
