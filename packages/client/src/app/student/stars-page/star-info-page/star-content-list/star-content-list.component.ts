import { Component, Input, OnInit } from '@angular/core';
import { StarContent, Figure, DanceLevel, StarDanceLevel } from '@core/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as selectors from '@app/_infra/store/selectors/figures.selectors';
import { Store } from '@ngrx/store';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';
import { element } from 'protractor';


@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html'
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

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.currentDance = this.content.danceTypes[0];
    // console.log('this.currentDance:', this.currentDance)
    this.convertEnumToArray();
    this.getFigures();
    this.addFiguresToArray()


    // this.currentLevel = { key: 'one', value: EnumDanceLevel.one };
    // this.currentDance = this.content.danceTypes[0];





  }

  setCurrentDance(dance){
    this.currentDance = dance
  }

  addFiguresToArray() {
    // if (this.levels) {
    //   this.levels.forEach(level => {
    //     console.log('level:', level)

    //   })
    // }

    // console.log(DanceLevel)
    if (this.figures && this.levels) {
      this.figures.forEach(figure => {
    
        if(figure.type == this.currentDance){
          // console.log('figure:', figure.level)
          // console.log('figure:', figure.type)
          this.levels.forEach(level=>{
            console.log('level:', level.level)
            // if()

          })
        }

      })
    }



  }

  convertEnumToArray() {

    const arrayObjects = []

    for (const [propertyKey, propertyValue] of Object.entries(this.EnumDanceLevel)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({ level: propertyValue });
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
              this.store.dispatch(FiguresActions.BeginGetFiguresAction({
                payload: this.starId,
              })
              );
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

  // setCurrentDance(dance) {
  //   this.currentDance = dance;
  // }

  // setCurrentLevel(level) {
  //   this.currentLevel = level;

  // }

}
