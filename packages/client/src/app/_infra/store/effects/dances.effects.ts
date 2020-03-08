import { Injectable } from '@angular/core';
import { Dance } from '@core/models/dance.model';
import { DancesService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as DancesActions from '../actions/dances.actions';

@Injectable()
export class DancesEffects {
    constructor(private action$: Actions, private dancesService: DancesService) { }

    getStars$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(DancesActions.BeginGetDancesAction),
            mergeMap(action =>
                this.dancesService.getDances().pipe(
                    map((data: Dance[]) => {
                        return DancesActions.SuccessGetDancesAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(DancesActions.ErrorDancesAction(error));
                    })
                )
            )
        )
    );
}
