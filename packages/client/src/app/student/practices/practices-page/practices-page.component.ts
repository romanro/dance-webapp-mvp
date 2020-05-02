import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
  prcticesData: Array<object> = null;
  constructor() {
    this.currentDate = this.lastDate;
    this.prcticesData = [
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
        date: new Date('5/1/2020'),
        title: 'title',
        subTitle: 'subTitle'
      },
      {
        date: new Date('1/3/2020'),
        title: 'title',
        subTitle: 'subTitle'
      },

    ]
  }



  ngOnInit() {
    this.setMonthsLength();
    this.maxMonthLength = this.monthLength;
    this.setDisabledBtn();
    console.log(this.prcticesData);

  }

  setMonthsLength() {
    this.monthLength = this.currentDate.getMonth() - this.startDate.getMonth() + (12 * (this.currentDate.getFullYear() - this.startDate.getFullYear())) + 1;
  }

  setDisabledBtn() {
    console.log(this.monthLength);
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

  }

  decreaseMonths() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.setMonthsLength();
    this.setDisabledBtn();

  }


}
