import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Practice } from '@app/_infra/core/models';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { VideoPlayerWrapperComponent } from '@ui/video-player-wrapper/video-player-wrapper.component'
import { TranslateService } from '@ngx-translate/core';
import { element } from 'protractor';

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
  disabledNote: boolean = true;
  disabledTitle: boolean = true;
  practiceTitleInput: string = '';
  hiddenVideo: boolean = false;
  hiddenNotes: boolean = false;
  noteButtonText: string = '';
  videoButtonText: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.practiceId = params.id;
    });

    this.translate.get('PRACTICES.PRACTICE.hideNotes').subscribe((res: string) => {
      this.noteButtonText = res;
    });

    this.translate.get('PRACTICES.PRACTICE.hideVideo').subscribe((res: string) => {
      this.videoButtonText = res;
    });

    this.practice = {
      id: 3,
      date: new Date('5/5/2020'),
      title: 'title1',
      subTitle: 'subTitle',
      userVideo: 'http://static.videogular.com/assets/videos/videogular.mp4',
      notes: []
    }
    this.practiceTitleInput = this.practice.title;
  }

  backToPractices() {
    this.router.navigate(['student/practices']);
  }

  editTitle() {
    this.disabledTitle = false;
    this.disabled = false;
  }

  editNote() {
    this.disabledNote = false;
    this.disabled = false;
  }

  saveChanges() {
    this.practice.title = this.practiceTitleInput;
    this.disabled = true;
    this.disabledNote = true;
    this.disabledTitle = true;
    // this.backToPractices();
  }

  toggleVideo() {
    this.hiddenVideo = !this.hiddenVideo;
    if (this.hiddenVideo)
      this.videoButtonText = this.translateButtons('PRACTICES.PRACTICE.showVideo');
    else
      this.videoButtonText=this.translateButtons('PRACTICES.PRACTICE.hideVideo');
    
  }

  toggleNotes() {
    this.hiddenNotes = !this.hiddenNotes;
    if (this.hiddenNotes)
      this.noteButtonText =  this.translateButtons('PRACTICES.PRACTICE.showNotes');
    else
      this.noteButtonText =  this.translateButtons('PRACTICES.PRACTICE.hideNotes');
  }

  translateButtons(translateTerm): string {
    var buttonText = '';
    this.translate.get(translateTerm).subscribe((res: string) => {
      buttonText= res;
    });
    return buttonText;
  }
}
