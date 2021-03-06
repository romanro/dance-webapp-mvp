import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '@app/_infra/core/services';
import * as UserActions from '@app/_infra/store/actions/user.actions';
import { CreatePracticeData } from '@core/models';
import { LAB_USER_VIDEO_DURATION_DIFF_LIMIT, LabItem, LabPlayerType, LabUserVideo, LabViewType } from '@core/models/';
import { BackgroundProcessesService } from '@core/services';
import * as LabActions from '@infra/store/actions//lab.actions';
import * as labSelectors from '@infra/store/selectors/lab.selectors';
import * as userSelectors from '@infra/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-lab-page',
  templateUrl: './lab-page.component.html'
})
export class LabPageComponent implements OnInit, OnDestroy {

  private maxVideoDuration = 0;
  private userStamp: string;
  userVideo: LabUserVideo;
  practiceIsSaved = false;
  labItem: LabItem = null;
  labView: LabViewType = LabViewType.EMPTY;
  subs: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    private backgroundProcessesService: BackgroundProcessesService
  ) { }

  ngOnInit() {
    this.setLabView();

    this.subs.push(
      this.store.select(
        labSelectors.selectCurrentLabItem()).subscribe(res => {
          this.labItem = res ? { ...res } : null;
          this.setLabView();
        })
    )
    this.subs.push(
      this.store.select(
        userSelectors.selectCurrentUser()).subscribe(res => {
          if (res) {
            this.userStamp = `user_${res._id}_${res.profile.name.firstName}_${res.profile.name.lastName}`;
          } else {
            this.store.dispatch(UserActions.BeginGetUserAction());
          }
        })
    )



  }

  setLabView(): void {
    if (!this.labItem) {
      this.labView = LabViewType.EMPTY;
    } else {
      this.labView = this.labItem.starVideo && this.labItem.userVideo ? LabViewType.FULL : LabViewType.PREVIEW;
      this.practiceIsSaved = this.labItem.practiceIsSaved ? true : false;
    }
  }

  setDurationLimit(masterDuration: number): void {
    this.maxVideoDuration = masterDuration + LAB_USER_VIDEO_DURATION_DIFF_LIMIT;
  }

  userVideoFileChanged(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.userVideo = new LabUserVideo({
        name: `${encodeURI(this.labItem.figure.name)}_${this.userStamp}`,
        path: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
        file
      });
    }
  }

  checkUserVideoDuration(event) {
    const duration = event.target.duration;
    if (duration > this.maxVideoDuration) {
      this.clearUserVideo();
      this.alertService.error('LAB.ERRORS.userDurationError', this.maxVideoDuration.toString());
    } else {
      this.practiceIsSaved = false;
      this.updateLabStore();
    }
  }

  clearUserVideo() {
    this.userVideo = null;
    this.practiceIsSaved = false;
    this.updateLabStore();
  }

  clearLabItem() {
    this.store.dispatch(LabActions.ClearLabAction());
  }

  clearVideo(type: LabPlayerType): void {
    switch (type) {
      case LabPlayerType.MASTER:
        this.clearLabItem();
        break;
      case LabPlayerType.STUDENT:
        this.clearUserVideo();
        break;
    }

  }

  updateLabStore() {
    const payload: LabItem = { ...this.labItem, userVideo: this.userVideo, practiceIsSaved: this.practiceIsSaved };
    this.store.dispatch(LabActions.UpdateLabAction({ payload }));
  }

  saveToPractices(): void {
    const data: CreatePracticeData = new FormData();
    data.append('name', `${this.labItem.star.name.firstName} ${this.labItem.star.name.lastName} ${this.labItem.figure.name}`);
    data.append('associatedVideoId', this.labItem.starVideo._id);
    data.append('video', this.userVideo.file);

    this.backgroundProcessesService.uploadPractice(data, `upload_practice_${this.userStamp}`);

    this.practiceIsSaved = true;

    this.updateLabStore();

    setTimeout(()=>{
      this.practiceIsSaved = false;
    }, 3000)
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
