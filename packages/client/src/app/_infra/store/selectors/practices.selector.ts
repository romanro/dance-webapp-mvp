import { createSelector } from '@ngrx/store';
import t from 'typy';

import { PracticesState } from '../state';

export const selectPractices = (state: PracticesState) => state.practices;

export const selectAllPracticesSorted = () => createSelector(
    selectPractices, (allPractices) => {
        console.log('allPractices:', allPractices)
        console.log(222);
        if (!t(allPractices, 'practices').isNullOrUndefined) {
            return t(allPractices, 'practices').safeArray.slice().sort((practice1, practice2) => practice1.currentChallenge ? -1 : 1);
        } else {
            return null;
        }
    }
)

