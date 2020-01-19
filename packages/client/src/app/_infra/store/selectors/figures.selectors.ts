import { Figure } from '@app/_infra/core/models';
import { createSelector } from '@ngrx/store';

import { FiguresState } from './../state/figures.state';

export const selectFigures = (state: FiguresState) => state.figures;

export const selectFigureById = (id) => createSelector(
    selectFigures, (allFigures) => {
        if (allFigures) {
            return allFigures['figures'].find(figure => figure.id === id);
        } else {
            return {};
        }
    }
);

export const selectFiguresByIds = (ids: Array<string>) => createSelector(
    selectFigures, (allFigures) => {
        const figures: Array<Figure> = [];
        if (allFigures) {
            ids.forEach(id => {
                const figure = allFigures['figures'].find(fig => fig.id === id);
                figures.push(figure);
            });
        }
        return figures;

    }
);