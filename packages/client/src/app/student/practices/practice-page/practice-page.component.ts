import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Practice, PracticeError } from '@app/_infra/core/models';
import { AlertErrorService } from '@app/_infra/core/services';
import * as PracticeAction from '@app/_infra/store/actions/practices.actions';
import * as selectors from '@app/_infra/store/selectors/practices.selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-practice-page',
  templateUrl: './practice-page.component.html',
  styles: [
  ]
})

export class PracticePageComponent implements OnInit, OnDestroy {

  practiceId: string = null;
  loading = true;
  practice: Practice = null;
  disabled = true;
  disabledNote = true;
  disabledTitle = true;
  practiceTitleInput = '';
  hiddenVideo = false;
  hiddenNotes = false;
  noteButtonText = '';
  videoButtonText = '';
  storeSelectSub: Subscription = null;
  subs: Subscription[] = [];
  errorMsg: PracticeError | string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private store: Store<any>,
    private errorService: AlertErrorService
  ) { }

  ngOnInit(): void {

    this.translateContent()

    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.practiceId = params.get('practiceId');
        this.storeSelectSub =
          this.store.select(selectors.selectPracticeById(this.practiceId)).subscribe(
            practice => {
              if (practice) {
                this.practice = { ...practice };
                console.log("practice", this.practice)
                this.loading = false;
                this.practiceTitleInput = practice.title;
              } else {
                this.store.dispatch(PracticeAction.BeginGetPracticesAction());
              }
            }
          );
      })
    );

    this.subs.push(
      this.store.select(
        selectors.selectPracticesError()).subscribe(res => {
          if (res && res.type) {
            this.practice = null;
            this.loading = false;
            this.errorMsg = this.errorService.alertStarsError(res.type);
          }
        })
    );
  }

  ngOnDestroy(): void {
    if (this.storeSelectSub) { this.storeSelectSub.unsubscribe(); }
    this.subs.forEach(s => s.unsubscribe());
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
    let buttonText = '';
    this.translate.get(translateTerm).subscribe((res: string) => {
      buttonText = res;
    });
    return buttonText;
  }
}
