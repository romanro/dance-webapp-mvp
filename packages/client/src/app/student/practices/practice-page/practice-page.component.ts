import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Practice } from '@app/_infra/core/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPlayerWrapperComponent } from '@ui/video-player-wrapper/video-player-wrapper.component'

@Component({
  selector: 'dsapp-practice-page',
  templateUrl: './practice-page.component.html',
  styles: [
  ]
})

export class PracticePageComponent implements OnInit {

  practiceId: number = null;
  loading = false;
  practice: Practice = null;
  disabled: boolean = true;
  practiceTitleInput: string = '';
  constructor(private router: Router, private route: ActivatedRoute, ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.practiceId = params.id;
    });

    this.practice = {
      id: 3,
      date: new Date('5/5/2020'),
      title: 'title1',
      subTitle: 'subTitle'
    }
  }

  backToPractices() {
    this.router.navigate(['student/practices']);
  }
  editTitle() {
    this.disabled = false;
    console.log('this.disabled:', this.disabled)

  }
  saveChanges() {
    if (!this.disabled)
      this.practice.title = this.practiceTitleInput;
    this.disabled = true;
    // this.backToPractices();
  }
}
