import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertErrorService } from '@app/_infra/core/services';
import * as StarsContentActions from '@app/_infra/store/actions/stars-content.actions';
import * as selectors from '@app/_infra/store/selectors/stars-content.selectors';
import { Star, StarError } from '@core/models/star.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { VideoPlayerModalComponent } from '@ui/video-player-modal/video-player-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-info-page',
  templateUrl: './star-info-page.component.html'
})
export class StarInfoPageComponent implements OnInit, OnDestroy {


  starId: string;
  star: Star = null;

  loading = true;
  errorMsg: StarError | string = null;

  starExists = false;

  storeSelectSub: Subscription = null;
  subs: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: AlertErrorService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.starId = params.get('starId');
        this.storeSelectSub =
          this.store.select(selectors.selectStarContentById(this.starId)).subscribe(
            star => {
              if (star) {
                this.star = { ...star };
                this.loading = false;
                this.errorMsg = null;
              } else {
                this.store.dispatch(StarsContentActions.BeginGetStarsContentAction({payload: this.starId}));
              }
            }
          );
      })
    );
    this.subs.push(
      this.store.select(
        selectors.selectStarsContentError()).subscribe(res => {
          if (res && res.type) {
            this.star = null;
            this.loading = false;
            this.errorMsg = this.errorService.alertStarsError(res.type);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    if (this.storeSelectSub) {
      this.storeSelectSub.unsubscribe();
    }
  }

  tryAgain() {
    this.star = null;
    this.errorMsg = null;
    this.loading = true;
    setTimeout(() => {
      this.store.dispatch(StarsContentActions.BeginGetStarsContentAction({payload: this.starId}));
    }, 2000);

  }

  openPromoModal() {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = this.star.promoVideoURL;
    modalRef.componentInstance.title = this.star.name;
    modalRef.componentInstance.autoplay = true;
  }

}
