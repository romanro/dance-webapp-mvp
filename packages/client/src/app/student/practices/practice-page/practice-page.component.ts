import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Practice } from '@app/_infra/core/models';

@Component({
  selector: 'dsapp-practice-page',
  templateUrl: './practice-page.component.html',
  styles: [
  ]
})
export class PracticePageComponent implements OnInit {

  practiceId: number;
  practice: Practice;
  test: string = 'dsadasd';

  constructor(private route: ActivatedRoute, private router: Router) {
    let paramsObj;
    this.route.params.subscribe(params => paramsObj = params);
    this.practiceId = paramsObj.id;
    console.log('this.practiceId:', this.practiceId)
  }

  ngOnInit(): void {
    this.practice = {
      id: 3,
      date: new Date('5/5/2020'),
      title: 'title1',
      subTitle: 'subTitle'
    }
    console.log(this.practice)
  }

  backToPracticesList() {
    this.router.navigate(['student/practices']);
  }

}
