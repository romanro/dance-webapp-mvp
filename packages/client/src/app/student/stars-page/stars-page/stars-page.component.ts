import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertErrorService } from '@app/_infra/core/services';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { Configuration, Name, Star, StarError } from '@core/models';
import { ConfigurationService } from '@core/services/configuration.service';
import * as selectors from '@infra/store/selectors/stars.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarsPageComponent implements OnInit, OnDestroy {

  // stars$: Observable<StarsState>;
  stars: Star[] = null;
  subs: Subscription[] = [];
  aboutBtnTxt = '';
  aboutVideoURL: string = null;
  loading = true;
  errorMsg: StarError | string = null;

  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
    private configService: ConfigurationService,
    private translate: TranslateService,
    private errorService: AlertErrorService
  ) {
    // this.stars$ = store.pipe(select('stars'));
    translate.get('COMMON.About').subscribe((res: string) => {
      this.aboutBtnTxt = res;
    });
  }

  ngOnInit() {

    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.aboutVideoURL = config.aboutVideoURL;
    }

    this.subs.push(
      this.store.select(selectors.selectAllStarsSorted()).subscribe(
        res => {
          if (res) {
            this.stars = [...res];
            this.loading = false;
          } else {
            this.store.dispatch(StarsActions.BeginGetStarsAction());
          }
        }
      )
    );

    this.subs.push(
      this.store.select(
        selectors.selectStarsError()).subscribe(res => {
          if (res && res.type) {
            this.errorMsg = this.errorService.alertUserError(res.type);
          }
        })
    );



    /*     this.subs.push(
          this.stars$.subscribe(
            res => {
              if (res && res.stars && res.stars.length > 0) {
                this.stars = [
                  ...res.stars.sort((star1, star2) => star1.currentChallenge ? -1 : 1)
                ];
                this.loading = false;
              } else {
                this.store.dispatch(StarsActions.BeginGetStarsAction());
              }
            }
          )
        ); */

  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  openPromoModal(starName: Name | string, promoUrl: string) {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = promoUrl;
    modalRef.componentInstance.title = starName;
    modalRef.componentInstance.autoplay = true;
  }

}
