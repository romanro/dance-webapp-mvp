import { StarSkill } from '@core/models/skill.model';

export class SkillsState {
    skills: Array<StarSkill>;
}

export const initializeSkillsState = () => {
    return { skills: Array<StarSkill>() };
};
