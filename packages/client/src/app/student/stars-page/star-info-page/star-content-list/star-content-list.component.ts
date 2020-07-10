import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { StarContent, Figure, DanceLevel, StarDanceLevel } from '@core/models';
import { Router } from '@angular/router';
import { Subscription, observable, of, } from 'rxjs';
import * as selectors from '@app/_infra/store/selectors/figures.selectors';
import { Store } from '@ngrx/store';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';
import { element } from 'protractor';


@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html',

})

export class StarContentListComponent implements OnInit {

  @Input() starId: string = null;
  @Input() content: StarContent = null;
  EnumDanceLevel: typeof DanceLevel = DanceLevel;
  levels: Array<any>;
  subs: Array<Subscription> = [];
  figures: Figure[];
  // loading = true;
  currentDance: string;
  currentLevel: any;
  routeUrl: string = null;
  danceTypes: Array<string> = [];
  @Output() onSuggest: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.currentDance = this.content.danceTypes[0];
    this.danceTypes = this.content.danceTypes;
    this.convertEnumToArray();
    this.getFigures();
  }

  setCurrentDance(dance) {
    this.currentDance = dance
    this.addFiguresToArray();
  }

  addFiguresToArray() {
    if (this.figures && this.levels) {
      let figuresArray = [];
      this.levels.forEach(level => {
        this.figures.forEach(figure => {
          if (figure.type == this.currentDance && +level.level === +figure.level) {
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
        this.store.select(selectors.selectAllFiguresSorted(this.starId)).subscribe(
          content => {
            if (content) {
              this.figures = [...content];
              this.addFiguresToArray();
            } else {
              this.store.dispatch(FiguresActions.BeginGetFiguresAction({payload: this.starId,}));
            }
          }
        )
      );

      this.subs.push(
        this.store.select(
          selectors.selectFiguresError()).subscribe(res => {
            if (res && res.type) {
              this.figures = null;
            }
          })
      );
    }
  }
}
