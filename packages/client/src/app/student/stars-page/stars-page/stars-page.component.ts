import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertErrorService } from '@app/_infra/core/services';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { Name, Star, StarError } from '@core/models';
import { ConfigurationService } from '@core/services/configuration.service';
import * as selectors from '@infra/store/selectors/stars.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html'
})
export class StarsPageComponent implements OnInit, OnDestroy {

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
    translate.get('COMMON.About').subscribe((res: string) => {
      this.aboutBtnTxt = res;
    });
  }

  ngOnInit() {

    const vURL: string = this.configService.getAboutVideoURL();
    this.aboutVideoURL = vURL ? vURL : '';


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
            this.stars = null;
            this.loading = false;
            this.errorMsg = this.errorService.alertStarsError(res.type);
          }
        })
    );

  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }


  tryAgain() {
    this.stars = null;
    this.errorMsg = null;
    this.loading = true;
    setTimeout(() => {
      this.store.dispatch(StarsActions.BeginGetStarsAction());
    }, 2000);

  }

  openPromoModal(starName: Name | string, promoUrl: string) {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = promoUrl;
    modalRef.componentInstance.title = starName;
    modalRef.componentInstance.autoplay = true;
  }

}
