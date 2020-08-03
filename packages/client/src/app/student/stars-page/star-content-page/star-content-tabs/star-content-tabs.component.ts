import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { Star, StarContent } from '@core/models';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-content-tabs',
  templateUrl: './star-content-tabs.component.html'
})
export class StarContentTabsComponent implements OnInit, OnDestroy {

  @Input() star: Star;

  content: StarContent = null;
  loading = true;
  subs: Subscription[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectStarContentByStarId(this.star._id)).subscribe(
        content => {
          if (content) {
            this.content = { ...content };
            this.loading = false;
          } else {
            this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.star._id }));
          }

        }
      )
    );
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

}
