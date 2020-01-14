import { StarSkill } from '@core/models/skill.model';
import { createAction, props } from '@ngrx/store';

export const GetSkillsAction = createAction('[skills] - Get skills');

export const BeginGetSkillsAction = createAction('[skills] - Begin Get skills');

export const SuccessGetSkillsAction = createAction(
    '[skills] - Success Get skills',
    props<{ payload: StarSkill[] }>()
);

export const ErrorSkillsAction = createAction('[skills] - Error', props<Error>());