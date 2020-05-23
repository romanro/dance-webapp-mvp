import { ChangeDetectionStrategy, Component, OnInit, EventEmitter } from '@angular/core';
import { Subscription, from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Practice } from '@core/models';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'dsapp-practices-page',
  templateUrl: './practices-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PracticesPageComponent implements OnInit {

  loading = false;
  errorMsg: string = null;
  startDate: Date = new Date('1/1/2020');
  lastDate: Date = new Date();
  currentDate: Date;
  monthLength: number;
  maxMonthLength: number;
  nextBtndisabled = false;
  prevBtndisabled = false;
  practicesData: Practice[] = null;
  practices: Practice[] = [];
  test: Practice[] = [];
  subs: Subscription[] = [];
  searchTerm: string = '';
  selectedValue: string = '';

  constructor(
    private store: Store<any>,
    private translate: TranslateService,

  ) {
    this.currentDate = this.lastDate;
    this.practicesData = [
      {
        id: 1,
        date: new Date('1/1/2020'),
        title: 'title1',
        subTitle: 'subTitle',
        userVideo:'',
        notes:[]
      },
      {
        id: 2,
        date: new Date('2/1/2020'),
        title: 'title',
        subTitle: 'subTitle',
        userVideo:'',
        notes:[]
      },
      {
        id: 3,
        date: new Date('5/5/2020'),
        title: 'title1',
        subTitle: 'subTitle',
        userVideo:'',
        notes:[]
      },
      {
        id: 4,
        date: new Date(),
        title: 'title2',
        subTitle: 'subTitle',
        userVideo:'',
        notes:[]
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
    this.practices=[];
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


  isHidden(title) {
    return !title.includes(this.selectedValue);  
  }

  search() {
    this.selectedValue = this.searchTerm;
  }

  clear(){
    this.searchTerm='';
    this.selectedValue = '';
  }



}
