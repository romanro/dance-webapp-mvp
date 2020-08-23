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
  }

  fileChangeEvent(event) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
