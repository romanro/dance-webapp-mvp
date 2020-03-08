import { Component, OnDestroy, OnInit } from '@angular/core';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { StarsState } from '@app/_infra/store/state';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { Name, Star } from '@core/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  styles: []
})
export class StarsPageComponent implements OnInit, OnDestroy {

  stars$: Observable<StarsState>;
  stars: Star[] = [];
  subs: Subscription[] = [];

  loading = true;

  constructor(private store: Store<any>, private modalService: NgbModal) {
    this.stars$ = store.pipe(select('stars'));
  }

  ngOnInit() {
    this.subs.push(
      this.stars$.subscribe(
        res => {
          if (res.stars) {
            this.stars = [...res.stars];
            this.loading = res.stars.length === 0;
          }
        }
      )
    );
    this.store.dispatch(StarsActions.BeginGetStarsAction());
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  openPromoModal(starName: Name, promoUrl: string) {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = promoUrl;
    modalRef.componentInstance.title = starName;
    modalRef.componentInstance.autoplay = true;
  }

}
