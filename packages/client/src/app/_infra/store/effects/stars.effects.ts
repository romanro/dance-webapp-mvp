import { Injectable } from '@angular/core';
import { Star } from '@core/models';
import { StarsService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as StarsActions from '../actions/stars.actions';

@Injectable()
export class StarsEffects {
    constructor(private action$: Actions, private starsService: StarsService) { }

    getStars$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(StarsActions.BeginGetStarsAction),
            mergeMap(action =>
                this.starsService.getStars().pipe(
                    map((data: Star[]) => {
                        console.log('data:', data)
                        return StarsActions.SuccessGetStarsAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(StarsActions.ErrorStarsAction(error));
                    })
                )
            )
        )
    );
}
