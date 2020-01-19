import { createSelector } from '@ngrx/store';

import { DancesState } from './../state';

export const selectDances = (state: DancesState) => state.dances;


export const selectDanceById = (id) => createSelector(
    selectDances, (allDances) => {
        if (allDances) {
            return allDances['dances'].find(dance => dance.id === id);
        } else {
            return {};
        }
    }
);

export const selectDancesByStarId = (starId) => createSelector(
    selectDances, (allDances) => {
        if (allDances) {
            return allDances['dances'].filter(dance => dance.starId === starId);
        } else {
            return [];
        }
    }
);
