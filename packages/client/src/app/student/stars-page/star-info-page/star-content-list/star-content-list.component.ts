import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import * as selectors from '@app/_infra/store/selectors/stars-content.selectors';
import { StarContent, StarContentError } from '@core/models';
import { AlertErrorService } from '@core/services';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Dance, DanceLevel, StarDanceLevel } from '@core/models';
import {  Router, ActivatedRoute } from '@angular/router';


enum EnumDanceLevel {
  one = "beginner",
  two = "intermediate",
  three = "advanced",
}
@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html'
})
export class StarContentListComponent implements OnInit, OnDestroy {

  @Input() starId: string = null;
  @Input() starContentObj: StarContent = null;
  EnumDanceLevel : typeof EnumDanceLevel = EnumDanceLevel;
  currentDance : DanceLevel;
  currentLevel: any;
  content: StarContent = null;
  danceTypes = [];
  loading = true;
  errorMsg: StarContentError | string = null;


  subs: Array<Subscription> = [];

  constructor(private store: Store<any>, private errorService: AlertErrorService,     private router: Router,     private route: ActivatedRoute,

    ) { }

  ngOnInit(): void {

    this.currentLevel =  {key: 'one', value: EnumDanceLevel.one};
    this.danceTypes = this.starContentObj['danceTypes'];
    this.currentDance = this.danceTypes[0];

    if (this.starId) {
      this.subs.push(
        this.store.select(selectors.selectStarContentById(this.starId)).subscribe(
          content => {
            if (content) {
              this.content = { ...content };
              this.loading = false;
              this.errorMsg = null;
              // this.router.navigate([this.router.url, 'figures' ], { queryParams: {dance: this.currentDance,level: this.currentLevel.value } });
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
      this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.starId }));
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
