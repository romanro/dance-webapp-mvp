import { createSelector } from '@ngrx/store';

import { SkillsState } from '../state';

export const selectSkills = (state: SkillsState) => state.skills;

export const selectSkillByStarId = (starId) => createSelector(
    selectSkills, (allSkills) => {
        if (allSkills) {
            return allSkills['skills'].filter(skill => skill.starBasicInfo.id === starId);
        } else {
            return [];
        }
    }
);
