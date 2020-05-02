import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription, from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Practice } from '@core/models';

@Component({
  selector: 'dsapp-practices-page',
  templateUrl: './practices-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PracticesPageComponent implements OnInit {

  loading = true;
  errorMsg: string = null;
  startDate: Date = new Date('1/1/2020');
  lastDate: Date = new Date();
  currentDate: Date;
  monthLength: number;
  maxMonthLength: number;
  nextBtndisabled = false;
  prevBtndisabled = false;
  practicesData: Practice[] = null;
  practices: Practice[]=[];
  subs: Subscription[] = [];


  constructor(
    private store: Store<any>,

  ) {
    this.currentDate = this.lastDate;
    this.practicesData = [
      {
        date: new Date('1/1/2020'),
        title: 'title',
        subTitle: 'subTitle'
      },
      {
        date: new Date('2/1/2020'),
        title: 'title',
        subTitle: 'subTitle'
      },
      {
        date: new Date('5/5/2020'),
        title: 'title',
        subTitle: 'subTitle'
      },
      {
        date: new Date(),
        title: 'title',
        subTitle: 'subTitle'
      },

    ]
  }



  ngOnInit() {
    this.setMonthsLength();
    this.maxMonthLength = this.monthLength;
    this.setDisabledBtn();
    this.getMonthlyPractices();

  }

  getMonthlyPractices() {
    for (let practice of this.practicesData) {
      if (this.compareDates(this.currentDate, practice.date))
        this.practices.push(practice);
    }
  }

  setMonthsLength() {
    this.monthLength = this.currentDate.getMonth() - this.startDate.getMonth() + (12 * (this.currentDate.getFullYear() - this.startDate.getFullYear())) + 1;
  }

  setDisabledBtn() {
    if (this.monthLength == this.maxMonthLength)
      this.nextBtndisabled = true;
    else if (this.monthLength == 1)
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
    this.getMonthlyPractices();

  }

  decreaseMonths() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.setMonthsLength();
    this.setDisabledBtn();
    this.getMonthlyPractices();

  }

  compareDates(firstDate, secondDate) {
    if (firstDate.getMonth() == secondDate.getMonth() && firstDate.getFullYear() == secondDate.getFullYear())
      return true;
    else
      return false;

  }


}
