import { Component, OnDestroy, OnInit } from '@angular/core';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { StarsState } from '@app/_infra/store/state';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  styles: []
})
export class StarsPageComponent implements OnInit, OnDestroy {

  stars$: Observable<StarsState>;
  subs: Subscription[] = [];

  loading = true;

  constructor(private store: Store<any>) {
    this.stars$ = store.pipe(select('stars'));
  }

  ngOnInit() {
    this.subs.push(
      this.stars$.subscribe(
        res => {
          if (res.stars) {
            this.loading = res.stars.length === 0;
          }
        }
      )
    );
    this.store.dispatch(StarsActions.BeginGetStarsAction());
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

}
