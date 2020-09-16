import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertErrorService } from '@app/_infra/core/services';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { Name, Star, StarError } from '@core/models';
import { ConfigurationService } from '@core/services/configuration.service';
import * as selectors from '@infra/store/selectors/stars.selectors';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html'
})
export class StarsPageComponent implements OnInit, OnDestroy {

  stars: Star[] = null;
  filteredStars: Star[] = [];
  subs: Subscription[] = [];
  aboutBtnTxt = '';
  aboutVideoURL: string = null;
  loading = true;
  errorMsg: StarError | string = null;
  search: FormControl;

  constructor(
    private store: Store<any>,
    private configService: ConfigurationService,
    private translate: TranslateService,
    private errorService: AlertErrorService
  ) {
    translate.get('COMMON.About').subscribe((res: string) => {
      this.aboutBtnTxt = res;
    });
  }

  ngOnInit() {

    this.search = new FormControl('');

    const vURL: string = this.configService.getAboutVideoURL();
    this.aboutVideoURL = vURL ? vURL : '';


    this.subs.push(
      this.store.select(selectors.selectAllStars()).subscribe(
        res => {
          if (res) {
            this.stars = [...res];
            this.filterStars('');
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

    this.subs.push(
      this.search.valueChanges.pipe(startWith(''), debounceTime(700), distinctUntilChanged())
        .subscribe(val => this.filterStars(val))
    )
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  filterStars(searchString: string) {

    if (this.stars) {
      if (searchString) {

        searchString = searchString.toLocaleLowerCase();
        this.filteredStars = this.stars.filter(star => {
          const starName = this.getStarNameString(star.name);
          if (starName.indexOf(searchString) !== -1) {
            return star;
          }
        }).sort((s1, s2) => {
          const starName1 = this.getStarNameString(s1.name);
          const starName2 = this.getStarNameString(s2.name);
          return starName1.indexOf(searchString) - starName2.indexOf(searchString);
        });
      } else {
        this.filteredStars = this.stars.sort((s1, s2) => {
          const starName1 = this.getStarNameString(s1.name);
          const starName2 = this.getStarNameString(s2.name);
          let comparison = 0;
          if (starName1 > starName2) {
            comparison = 1;
          } else if (starName1 < starName2) {
            comparison = -1;
          }
          return comparison;
        });
      }
    }


  }

  getStarNameString(name: Name): string {
    return `${name.lastName}${name.firstName}${name.nickname ? name.nickname : ''}`.toLocaleLowerCase();
  }

  tryAgain() {
    this.stars = null;
    this.errorMsg = null;
    this.loading = true;
    setTimeout(() => {
      this.store.dispatch(StarsActions.BeginGetStarsAction());
    }, 2000);

  }

  openPromoModal(starName: Name | string, promoUrl: string) {
    /*     const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
        modalRef.componentInstance.videoURL = promoUrl;
        modalRef.componentInstance.title = starName;
        modalRef.componentInstance.autoplay = true; */
  }



}
