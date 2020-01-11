import { Component, OnDestroy, OnInit } from '@angular/core';
import * as selectors from '@app/_infra/store/selectors';
import { Star } from '@core/models/star.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { VideoPlayerModalComponent } from '@ui/video-player-modal/video-player-modal.component';
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

  constructor(private store: Store<any>, private modalService: NgbModal) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectStarById(this.starId)).subscribe(
        star => {
          this.star = { ...star };
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  openPromoModal() {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = this.star.promoVideoURL;
    modalRef.componentInstance.title = this.star.name;
    modalRef.componentInstance.autoplay = true;
  }

}
