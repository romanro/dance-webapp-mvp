import { Injectable } from '@angular/core';
import { DanceType, Figure, StarContent, StarContentDance, StarDanceLevel } from '@core/models';
import { FiguresService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as StarsContentActions from '../actions/stars-content.actions';


@Injectable()
export class StarsContentEffects {
    constructor(private action$: Actions, private figuresService: FiguresService) { }

    getStarContent$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(StarsContentActions.BeginGetStarsContentAction),
            mergeMap(action =>
                this.figuresService.getStarFigures(action.payload).pipe(
                    map((figures: Figure[]) => {

                        /// here we going to map array of figures into StarContent object

                        // creating array of unique DanceTypes
                        const danceTypes: Array<DanceType> = figures.map(figure => figure.type).filter((v, i, a) => a.indexOf(v) === i);

                        // creating array of Dances, based on DanceTypes
                        const dances: Array<StarContentDance> = danceTypes.map(type => {

                            // creating array of unique Level names
                            const danceLevelNames: Array<string> = figures.filter((figure) => figure.type === type)
                                .map(figure => figure.level)
                                .filter((v, i, a) => a.indexOf(v) === i);

                            // creating array of Levels Based on Level Names array
                            const levels: Array<StarDanceLevel> = danceLevelNames.map(level => {
                                const levelFigures = figures.filter(figure => figure.type === type && figure.level === level);
                                return { level, figures: levelFigures }
                            })
                            return { type, levels };
                        });

                        const starContent: StarContent = { starId: action.payload, dances };
                        return StarsContentActions.SuccessGetStarsContentAction({ payload: starContent });
                    }),
                    catchError((error: Error) => {
                        return of(StarsContentActions.ErrorStarsContentAction(error));
                    })
                )
            )
        )
    );
}
