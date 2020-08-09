import { Component, OnDestroy, OnInit } from '@angular/core';
import { LabItem } from '@core/models/';
import * as selectors from '@infra/store/selectors/lab.selectors';
import { LabState } from '@infra/store/state/lab.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-lab-page',
  templateUrl: './lab-page.component.html'
})
export class LabPageComponent implements OnInit, OnDestroy {

  labItem: LabItem = null;
  subs: Subscription[] = [];

  constructor(private store: Store<LabState>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(
        selectors.selectCurrentLabItem()).subscribe(res => {
          this.labItem = res ? { ...res } : null;
        })
    )

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
