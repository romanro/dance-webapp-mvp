import { Injectable } from '@angular/core';
import { Figure } from '@core/models';
import { FiguresService } from '@core/services/figures.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as FiguresActions from '../actions/figures.actions';

@Injectable()
export class FiguresEffects {
    constructor(private action$: Actions, private figuresService: FiguresService) { }

    getStars$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(FiguresActions.BeginGetFiguresAction),
            mergeMap(action =>
                this.figuresService.getFigures().pipe(
                    map((data: Figure[]) => {
                        return FiguresActions.SuccessGetFiguresAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(FiguresActions.ErrorGetFiguresAction(error));
                    })
                )
            )
        )
    );
}
