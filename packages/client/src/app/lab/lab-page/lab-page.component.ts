import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as UserActions from '@app/_infra/store/actions/user.actions';
import { LAB_USER_VIDEO_DURATION_DIFF_LIMIT, LabItem, LabUserVideo } from '@core/models/';
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

  labItem: LabItem = null;
  subs: Subscription[] = [];

  constructor(private store: Store<any>, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(
        labSelectors.selectCurrentLabItem()).subscribe(res => {
          this.labItem = res ? { ...res } : null;
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

  setDurationLimit(masterDuration: number) {
    this.maxVideoDuration = masterDuration + LAB_USER_VIDEO_DURATION_DIFF_LIMIT;
  }

  userVideoFileChanged(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      console.log(file.name);
      const userVideo: LabUserVideo = new LabUserVideo();
      userVideo.name = `${encodeURI(this.labItem.figure.name)}_${this.userStamp}`;
      userVideo.path = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      userVideo.file = file;
      console.log(userVideo);

      const payload: LabItem = { ...this.labItem, userVideo }

      this.store.dispatch(LabActions.UpdateLabAction({ payload }))

    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
