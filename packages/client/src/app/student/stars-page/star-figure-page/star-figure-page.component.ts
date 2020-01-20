import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as DancesActions from '@app/_infra/store/actions/dances.actions';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import * as selectors from '@app/_infra/store/selectors';
import { Dance, Figure, Star } from '@core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-figure-page',
  templateUrl: './star-figure-page.component.html'
})
export class StarFigurePageComponent implements OnInit, OnDestroy {

  starId: string;
  danceId: string;
  figureId: string;

  star: Star;
  dance: Dance;
  figure: Figure;

  subs: Array<Subscription> = [];

  constructor(private store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.starId = params.get('starId');
        this.danceId = params.get('danceId');
        this.figureId = params.get('figureId');

        // star info from store
        this.subs.push(
          this.store.select(selectors.selectStarById(this.starId)).subscribe(
            star => {
              if (star) {
                this.star = { ...star };
              } else {
                this.store.dispatch(StarsActions.BeginGetStarsAction());
                // this.goBackToStars();
              }
            }
          )
        );

        // current dance info from store
        this.subs.push(
          this.store.select(selectors.selectDanceById(this.danceId)).subscribe(
            dance => {
              if (dance) {
                this.dance = { ...dance };
                // console.log(this.dance);

              } else {
                this.store.dispatch(DancesActions.BeginGetDancesAction());
              }

            }
          )
        );

        // current figure info from store
        this.subs.push(
          this.store.select(selectors.selectFigureById(this.figureId)).subscribe(
            figure => {
              if (figure) {
                this.figure = { ...figure };
                console.log(this.figure);

              } else {
                this.store.dispatch(FiguresActions.BeginGetFiguresAction());
              }

            }
          )
        );

      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
