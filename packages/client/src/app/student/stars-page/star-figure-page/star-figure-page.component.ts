import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Figure, Star, Video, VideoType } from '@app/_infra/core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import * as StarSelectors from '@infra/store/selectors/stars.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dsapp-star-figure-page',
  templateUrl: './star-figure-page.component.html',
})
export class StarFigurePageComponent implements OnInit, OnDestroy {

  slug = null;
  star: Star = null;
  figure: Figure = null;
  figureId = null;
  starIsLoading = true;
  figureIsLoading = true;
  loading = true;

  basicPrinciplesVideos: Array<Video> = [];
  comparableVideos: Array<Video> = [];
  additionalVideos: Array<Video> = [];

  subs: Subscription[] = [];


  constructor(private store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit() {

    this.subs.push(
      this.route.params.subscribe((params: ParamMap) => {

        this.slug = params['slug'];
        this.figureId = params['figureId'];
      })
    )

    this.subs.push(
      this.store.select(StarSelectors.selectStarBySlug(this.slug)).subscribe(
        star => {
          if (star) {
            this.star = { ...star };
            this.starIsLoading = false;
          } else {
            this.store.dispatch(StarsActions.BeginGetStarsAction());
          }
        })
    )

    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe(
        figure => {
          if (figure) {
            this.figure = { ...figure };
            this.splitVideosByType();
            console.log(this.figure);
            this.starIsLoading = false;
          } else {
            this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId }));
          }
        })
    )
  }

  splitVideosByType(): void {
    this.basicPrinciplesVideos = [];
    this.comparableVideos = [];
    this.additionalVideos = [];

    this.figure.videos.forEach(video => {
      switch (video.type) {
        case VideoType.BASIC_PRINCIPLES:
          this.basicPrinciplesVideos.push(video);
          break;
        case VideoType.COMPARABLE:
          this.comparableVideos.push(video);
          break;
        case VideoType.ADDITIONAL:
          this.additionalVideos.push(video);
          break;
      }
    })
  }

  learnPrinciples(): void {

  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

}
