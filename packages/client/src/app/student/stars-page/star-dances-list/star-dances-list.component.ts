import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as DancesActions from '@app/_infra/store/actions/dances.actions';
import * as selectors from '@app/_infra/store/selectors';
import { Dance } from '@core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-dances-list',
  templateUrl: './star-dances-list.component.html',
  styles: []
})
export class StarDancesListComponent implements OnInit, OnDestroy {

  @Input() starId: string;

  dances: Dance[];

  subs: Subscription[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectDancesByStarId(this.starId)).subscribe(
        dances => {
          this.dances = [...dances];
        }
      )
    );

    this.store.dispatch(DancesActions.BeginGetDancesAction());
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
