import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
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


  starId: string;
  star: Star;

  starExists = false;

  subs: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.starId = params.get('starId');
        this.subs.push(
          this.store.select(selectors.selectStarById(this.starId)).subscribe(
            star => {
              if (star) {
                this.star = { ...star };
                this.starExists = true;
              } else {
                this.store.dispatch(StarsActions.BeginGetStarsAction());
                // this.goBackToStars();
              }
            }
          )
        );

      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  goBackToStars() {
    this.router.navigate(['/']);
  }

  openPromoModal() {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = this.star.promoVideoURL;
    modalRef.componentInstance.title = this.star.name;
    modalRef.componentInstance.autoplay = true;
  }

}
