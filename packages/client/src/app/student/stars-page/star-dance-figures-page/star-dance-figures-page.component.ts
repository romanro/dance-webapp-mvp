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
  selector: 'dsapp-star-dance-figures-page',
  templateUrl: './star-dance-figures-page.component.html',
  styles: []
})
export class StarDanceFiguresPageComponent implements OnInit, OnDestroy {

  starId: string;
  danceId: string;

  star: Star;
  dance: Dance;

  partnerFigures: Array<Figure> = [];
  soloFigures: Array<Figure> = [];

  subs: Array<Subscription> = [];

  constructor(private route: ActivatedRoute, private store: Store<any>) { }

  ngOnInit() {

    this.store.dispatch(FiguresActions.BeginGetFiguresAction());

    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.starId = params.get('starId');
        this.danceId = params.get('danceId');

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

        // figures info from store
        this.subs.push(
          this.store.select(selectors.selectFiguresByIds(this.dance.partnerFigures)).subscribe(
            figures => {
              if (figures) {
                this.partnerFigures = [...figures];
              } else {
                this.store.dispatch(FiguresActions.BeginGetFiguresAction());
              }
            }
          )
        );

        this.subs.push(
          this.store.select(selectors.selectFiguresByIds(this.dance.soloFigures)).subscribe(
            figures => {
              if (figures) {
                this.soloFigures = [...figures];
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
