import { Component, OnDestroy, OnInit } from '@angular/core';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { StarsState } from '@app/_infra/store/state';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { Configuration, Name, Star } from '@core/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { ConfigurationService } from './../../../_infra/core/services/configuration.service';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  styles: []
})
export class StarsPageComponent implements OnInit, OnDestroy {

  stars$: Observable<StarsState>;
  stars: Star[] = [];
  subs: Subscription[] = [];
  aboutBtnTxt = '';
  aboutVideoURL: string = null;
  loading = true;

  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
    private configService: ConfigurationService,
    private translate: TranslateService
  ) {
    this.stars$ = store.pipe(select('stars'));
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
      this.stars$.subscribe(
        res => {
          if (res && res.stars && res.stars.length > 0) {
            this.stars = [...res.stars];
            this.loading = res.stars.length === 0;
          } else {
            this.store.dispatch(StarsActions.BeginGetStarsAction());
          }
        }
      )
    );
    // this.store.dispatch(StarsActions.BeginGetStarsAction());
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  openPromoModal(starName: Name | string, promoUrl: string) {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = promoUrl;
    modalRef.componentInstance.title = starName;
    modalRef.componentInstance.autoplay = true;
  }

}
