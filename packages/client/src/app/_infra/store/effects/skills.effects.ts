import { Injectable } from '@angular/core';
import { StarSkill } from '@core/models';
import { SkillsService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as SkillsActions from '../actions/skills.actions';


@Injectable()
export class SkillsEffects {
    constructor(private action$: Actions, private skillsService: SkillsService) { }

    getStars$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(SkillsActions.BeginGetSkillsAction),
            mergeMap(action =>
                this.skillsService.getSkills().pipe(
                    map((data: StarSkill[]) => {
                        return SkillsActions.SuccessGetSkillsAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(SkillsActions.ErrorSkillsAction(error));
                    })
                )
            )
        )
    );
}
