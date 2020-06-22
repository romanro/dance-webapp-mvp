import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertErrorService } from '@app/_infra/core/services';
import * as PracticesActions from '@app/_infra/store/actions/practices.actions';
import { Practice, PracticeError } from '@core/models';
import * as selectors from '@infra/store/selectors/practices.selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dsapp-practices-page',
  templateUrl: './practices-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PracticesPageComponent implements OnInit, OnDestroy {

  loading = false;
  errorMsg: PracticeError | string = null;
  startDate: Date = new Date('1/1/2020');
  lastDate: Date = new Date();
  currentDate: Date;
  monthLength: number;
  maxMonthLength: number;
  nextBtndisabled = false;
  prevBtndisabled = false;
  practicesData: Practice[] = null;
  practices: Practice[] = null;
  test: Practice[] = [];
  subs: Subscription[] = [];
  searchTerm = '';
  selectedValue = '';

  constructor(
    private store: Store<any>,
    private translate: TranslateService,
    private errorService: AlertErrorService
  ) {
    this.currentDate = this.lastDate;
  }



  ngOnInit() {

    this.setMonthsLength();

    this.maxMonthLength = this.monthLength;

    this.setDisabledBtn();


    this.subs.push(
      this.store.select(selectors.selectAllPracticesSorted()).subscribe(
        res => {
          if (res) {
            this.practices = [...res];
            this.loading = false;
          } else {
            this.store.dispatch(PracticesActions.BeginGetPracticesAction());
          }
        }
      )
    );

    this.subs.push(
      this.store.select(
        selectors.selectPracticesError()).subscribe(res => {
          if (res && res.type) {
            this.practices = null;
            this.loading = false;
            this.errorMsg = this.errorService.alertStarsError(res.type);
          }
        })
    );

  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  setMonthsLength() {
    const yearDelta = 12 * (this.currentDate.getFullYear() - this.startDate.getFullYear());
    this.monthLength = this.currentDate.getMonth() - this.startDate.getMonth() + yearDelta + 1;
  }

  setDisabledBtn() {
    if (this.monthLength === this.maxMonthLength)
      this.nextBtndisabled = true;
    else if (this.monthLength === 1)
      this.prevBtndisabled = true;
    else {
      this.prevBtndisabled = false;
      this.nextBtndisabled = false;
    }

  }

  increaseMonths() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.setMonthsLength();
    this.setDisabledBtn();

  }

  decreaseMonths() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.setMonthsLength();
    this.setDisabledBtn();

  }

  compareDates(firstDate, secondDate) {
    if (firstDate.getMonth() === secondDate.getMonth() && firstDate.getFullYear() === secondDate.getFullYear())
      return true;
    else
      return false;
  }


  isHidden(title) {
    return !title.includes(this.selectedValue);
  }

  search() {
    this.selectedValue = this.searchTerm;
  }

  clear() {
    this.searchTerm = '';
    this.selectedValue = '';
  }



}