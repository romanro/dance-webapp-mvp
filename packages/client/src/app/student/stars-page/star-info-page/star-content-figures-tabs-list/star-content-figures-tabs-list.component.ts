import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dance, DanceLevel, StarDanceLevel } from '@core/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from '@app/_infra/store/selectors/stars-content.selectors';


@Component({
  selector: 'dsapp-star-content-figures-tabs-list',
  templateUrl: './star-content-figures-tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarContentFiguresTabsListComponent implements OnInit {

  @Input() level: StarDanceLevel= null;
  @Input() dance: Dance = null;

  lvl = DanceLevel;
  subs: Array<Subscription> = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    console.log(1111111);
    console.log("this.level", this.level)
    console.log("this.dance", this.dance)

    if (this.level && this.dance) {
      this.subs.push(
        // this.store.select(selectors.selectStarContentById(this.starId)).subscribe(
        //   content => {
        //     if (content) {
        //       this.content = { ...content };
        //       this.loading = false;
        //       this.errorMsg = null;
        //     } else {
        //       this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.starId }));
        //     }
        //   }
        // )
      );
    }

  }

}
