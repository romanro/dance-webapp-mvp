import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Video } from '@app/_infra/core/models';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-lab-preview-upload',
  templateUrl: './lab-preview-upload.component.html'
})
export class LabPreviewUploadComponent implements OnInit, OnDestroy {

  @Input() previewVideo: Video;

  previewPlayerAPI: VgAPI;
  subs: Subscription[] = [];

  constructor() { }


  ngOnInit(): void {
  }

  onPreviewPlayerReady(api: VgAPI) {

    this.previewPlayerAPI = api;

    this.subs.push(
      this.previewPlayerAPI.getDefaultMedia().subscriptions.error.subscribe(
        error => { console.log(error); }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
