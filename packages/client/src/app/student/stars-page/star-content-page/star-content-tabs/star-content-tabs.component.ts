import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { Star } from '@core/models';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-content-tabs',
  templateUrl: './star-content-tabs.component.html'
})
export class StarContentTabsComponent implements OnInit, OnDestroy {

  @Input() star: Star;

  loading = true;
  subs: Subscription[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectStarContentByStarId(this.star._id)).subscribe(
        content => {
          if (content) {
            console.log('Component:', content);
          } else {
            this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.star._id }));
          }

        }
      )
    );
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

}
