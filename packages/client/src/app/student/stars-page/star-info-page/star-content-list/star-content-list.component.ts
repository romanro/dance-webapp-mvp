import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import * as selectors from '@app/_infra/store/selectors/stars-content.selectors';
import { StarContent, StarContentError } from '@core/models';
import { AlertErrorService } from '@core/services';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Dance, DanceLevel, StarDanceLevel } from '@core/models';


enum EnumDanceLevel {
  one = "one",
  two = "two",
  three = "three",
  four = "four"
}
@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html'
})
export class StarContentListComponent implements OnInit, OnDestroy {

  @Input() starId: string = null;
  @Input() starContentObj: StarContent = null;
  EnumDanceLevel : typeof EnumDanceLevel = EnumDanceLevel;
  currentDance : Dance;
  currentLevel: StarDanceLevel;
  content: StarContent = null;
  danceTypes = [];
  loading = true;
  errorMsg: StarContentError | string = null;


  subs: Array<Subscription> = [];

  constructor(private store: Store<any>, private errorService: AlertErrorService) { }

  ngOnInit(): void {

    this.currentLevel = EnumDanceLevel.one;
    console.log('this.currentLevel:', this.currentLevel)
    this.danceTypes = this.starContentObj['danceTypes'];
    this.currentDance = this.danceTypes[0];
    console.log('this.currentDance:', this.currentDance)

    if (this.starId) {
      this.subs.push(
        this.store.select(selectors.selectStarContentById(this.starId)).subscribe(
          content => {
            if (content) {
              this.content = { ...content };
              this.loading = false;
              this.errorMsg = null;
            } else {
              this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.starId }));
            }
          }
        )
      );
    }

    this.subs.push(
      this.store.select(
        selectors.selectStarsContentError()).subscribe(res => {
          if (res && res.type) {
            this.content = null;
            this.loading = false;
            this.errorMsg = this.errorService.alertStarsContentError(res.type);
          }
        })
    );
  }

  tryAgain() {
    this.content = null;
    this.errorMsg = null;
    this.loading = true;
    setTimeout(() => {
      // this.store.dispatch(StarContentActions.BeginGetStarsContentAction());
    }, 2000);

  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  setCurrentDance(dance){
    this.currentDance = dance;
  }
  setCurrentLevel(level){
    this.currentLevel = level;
  }

}
