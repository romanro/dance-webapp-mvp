import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';
import * as StarsContentActions from '@app/_infra/store/actions/stars-content.actions';
import * as figuresSelectors from '@app/_infra/store/selectors/figures.selectors';
import * as starContentSelectors from '@app/_infra/store/selectors/stars-content.selectors';
import { DanceLevel, Figure, StarContent, StarDanceLevel } from '@core/models';
import { Store } from '@ngrx/store';
import { observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html',

})

export class StarContentListComponent implements OnInit {

  @Output() onSuggest: EventEmitter<any> = new EventEmitter();

  starId: string = null;
  content: StarContent = null;
  EnumDanceLevel: typeof DanceLevel = DanceLevel;
  levels: Array<any>;
  subs: Array<Subscription> = [];
  figures: Figure[];
  currentDance: string;
  currentLevel: any;
  routeUrl: string = null;
  danceTypes: Array<string> = [];
  storeSelectSub: Subscription = null;
  previousUrl: string;

  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<any>,
  ) {
    const url = router.url.split('/');
    this.starId = url[url.length - 2];
  }

  ngOnInit(): void {
    this.getStarContent();
    this.currentDance = this.content.danceTypes[0];
    this.danceTypes = this.content.danceTypes;
    this.convertEnumToArray();
    this.getFigures();
  }

  getStarContent() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.storeSelectSub =
          this.store.select(starContentSelectors.selectStarContentById(this.starId)).subscribe(
            star => {
              if (star) {
                this.content = { ...star };
              } else {
                this.store.dispatch(StarsContentActions.BeginGetStarsContentAction({ payload: this.starId }));
              }
            }
          );
      })
    );
  }
  setCurrentDance(dance) {
    this.currentDance = dance
    this.addFiguresToArray();
  }

  addFiguresToArray() {
    if (this.figures && this.levels) {
      const figuresArray = [];
      this.levels.forEach(level => {
        this.figures.forEach(figure => {
          if (figure.type === this.currentDance && +level.level === +figure.level) {
            figuresArray.push(figure)
            level.figures = figuresArray;
          }
        })
      })
      this.levels = this.levels.map(item => Object.assign({}, item));
    }
  }

  convertEnumToArray() {
    const arrayObjects = []
    for (const [propertyKey, propertyValue] of Object.entries(this.EnumDanceLevel)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({ key: propertyKey, level: propertyValue });
    }
    this.levels = arrayObjects;
  }

  getFigures() {
    if (this.starId) {
      this.subs.push(
        this.store.select(figuresSelectors.selectAllFiguresSorted(this.starId)).subscribe(
          content => {
            if (content) {
              this.figures = [...content];
              this.addFiguresToArray();
            } else {
              this.store.dispatch(FiguresActions.BeginGetFiguresAction({ payload: this.starId, }));
            }
          }
        )
      );

      this.subs.push(
        this.store.select(
          figuresSelectors.selectFiguresError()).subscribe(res => {
            if (res && res.type) {
              this.figures = null;
            }
          })
      );
    }
  }
}
