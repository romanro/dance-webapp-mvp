import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Practice } from '@app/_infra/core/models';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from '@app/_infra/store/selectors/practices.selector';
import * as PracticeAction from '@app/_infra/store/actions/practices.actions';

@Component({
  selector: 'dsapp-practice-page',
  templateUrl: './practice-page.component.html',
  styles: [
  ]
})

export class PracticePageComponent implements OnInit {

  practiceId: number = null;
  loading = true;
  practice: Practice = null;
  disabled: boolean = true;
  disabledNote: boolean = true;
  disabledTitle: boolean = true;
  practiceTitleInput: string = '';
  hiddenVideo: boolean = false;
  hiddenNotes: boolean = false;
  noteButtonText: string = '';
  videoButtonText: string = '';
  storeSelectSub: Subscription = null;
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {

    this.translateContent()



    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.route.params.subscribe(params => {
          this.practiceId = params.id;
        });
        this.storeSelectSub =
          this.store.select(selectors.selectPracticeById(this.practiceId)).subscribe(
            practice => {
              if (practice) {
                this.practice = { ...practice };
                this.loading = false;
                this.practiceTitleInput= practice.title;
                // this.errorMsg = null;
              } else {
                this.store.dispatch(PracticeAction.BeginGetPracticesAction());
              }
            }
          );
      })
    );

    console.log(this.practice.title)
  }
  translateContent() {
    this.translate.get('PRACTICES.PRACTICE.hideNotes').subscribe((res: string) => {
      this.noteButtonText = res;
    });

    this.translate.get('PRACTICES.PRACTICE.hideVideo').subscribe((res: string) => {
      this.videoButtonText = res;
    });
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
      this.videoButtonText = this.translateButtons('PRACTICES.PRACTICE.hideVideo');

  }

  toggleNotes() {
    this.hiddenNotes = !this.hiddenNotes;
    if (this.hiddenNotes)
      this.noteButtonText = this.translateButtons('PRACTICES.PRACTICE.showNotes');
    else
      this.noteButtonText = this.translateButtons('PRACTICES.PRACTICE.hideNotes');
  }

  translateButtons(translateTerm): string {
    var buttonText = '';
    this.translate.get(translateTerm).subscribe((res: string) => {
      buttonText = res;
    });
    return buttonText;
  }
}
