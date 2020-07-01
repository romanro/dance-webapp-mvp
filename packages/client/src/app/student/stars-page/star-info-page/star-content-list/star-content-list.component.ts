import { Component, Input, OnInit } from '@angular/core';
import { StarContent, Figure, DanceLevel } from '@core/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as selectors from '@app/_infra/store/selectors/figures.selectors';
import { Store } from '@ngrx/store';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';


enum EnumDanceLevel {
  one = "beginner",
  two = "intermediate",
  three = "advanced",
}

@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html'
})

export class StarContentListComponent implements OnInit {

  @Input() starId: string = null;
  @Input() starContentObj: StarContent = null;
  EnumDanceLevel: typeof EnumDanceLevel = EnumDanceLevel;
  subs: Array<Subscription> = [];
  figures: Figure[];
  loading = true;
  currentDance: string;
  currentLevel: any;
  content: StarContent = null;
  danceTypes = [];
  routeUrl: string = null;

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit(): void {

    this.currentLevel = { key: 'one', value: EnumDanceLevel.one };
    this.danceTypes = this.starContentObj['danceTypes'];
    this.currentDance = this.danceTypes[0];
    this.getFigures();
    // this.routeUrl = this.router.url;

    // if(!this.routeUrl.includes('figures'))
    //   this.router.navigate([this.router.url, 'figures' ], { queryParams: {dance: this.currentDance,level: this.currentLevel.value } });

  }

  getFigures() {
    console.log(this.currentLevel.value);
    console.log('this.currentDance:', this.currentDance)

    if (this.currentLevel.value || this.currentLevel && this.currentDance) {
      this.subs.push(
        this.store.select(selectors.selectAllFiguresSorted(this.starId)).subscribe(
          content => {
            if (content) {
              console.log('content:', content)
              this.figures = [...content];
              this.loading = false;
            } else {
              this.store.dispatch(FiguresActions.BeginGetFiguresAction({
                starId: this.starId,
                level: this.currentLevel.value,
                danceType: this.currentDance
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
              this.loading = false;
              // this.errorMsg = this.errorService.alertStarsContentError(res.type);
            }
          })
      );
    }
  }

  setCurrentDance(dance) {
    this.currentDance = dance;
  }

  setCurrentLevel(level) {
    this.currentLevel = level;

  }

}
