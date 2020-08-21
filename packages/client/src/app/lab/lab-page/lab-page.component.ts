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
  labView: null | 'preview' | 'full' = null;
  subs: Subscription[] = [];

  constructor(private store: Store<LabState>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(
        selectors.selectCurrentLabItem()).subscribe(res => {
          this.labItem = res ? { ...res } : null;
          if (this.labItem && this.labItem.starVideo && this.labItem.userVideo) {
            this.labView = 'full';
          } else if (this.labItem && this.labItem.starVideo && !this.labItem.userVideo) {
            this.labView = 'preview';
          }
        })
    )

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
