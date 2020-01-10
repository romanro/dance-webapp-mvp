import { Component, OnDestroy, OnInit } from '@angular/core';
import * as selectors from '@app/_infra/store/selectors';
import { Star } from '@core/models/star.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-info-page',
  templateUrl: './star-info-page.component.html',
  styles: []
})
export class StarInfoPageComponent implements OnInit, OnDestroy {


  starId = '1';
  star: Star;

  subs: Subscription[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectStarById(this.starId)).subscribe(
        star => {
          this.star = { ...star };
          console.log(this.star);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
