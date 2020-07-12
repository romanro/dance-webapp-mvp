import { Injectable } from '@angular/core';
import { StarContent } from '@core/models';
import { StarsContentService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as StarsContentActions from '../actions/stars-content.actions';



@Injectable()
export class StarsContentEffects {
    constructor(private action$: Actions, private starsContentService: StarsContentService) { }

    getStarContent$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(StarsContentActions.BeginGetStarsContentAction),
            mergeMap(action =>
                this.starsContentService.getStarsContent(action.payload).pipe(
                    map((data: StarContent[]) => {
                        return StarsContentActions.SuccessGetStarsContentAction({ payload: data['star'] });
                    }),
                    catchError((error: Error) => {
                        return of(StarsContentActions.ErrorStarsContentAction(error));
                    })
                )
            )
        )
    );
}
