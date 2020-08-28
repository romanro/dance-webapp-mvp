import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  form: FormGroup;
  maxVideoDuration = 0;
  progress = 0;
  intVideoUrl: SafeUrl;
  subs: Subscription[] = [];

  constructor(public fb: FormBuilder, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      associatedObject: [this.previewVideo._id],
      video: [null]
    })
  }

  onPreviewPlayerReady(api: VgAPI) {
    this.previewPlayerAPI = api;
    this.subs.push(this.previewPlayerAPI.getDefaultMedia().subscriptions.loadedMetadata.subscribe(() => {
      /// getting original video duration and setting max duration x+5
      this.maxVideoDuration = this.previewPlayerAPI.getDefaultMedia().duration + 5;
    }))
  }

  fileChangeEvent(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.intVideoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.form.patchValue({
        video: file,
        name: file.name
      });
    }

  }

  getUploadingVideoDuration(event) {
    const duration = event.target.duration;
    console.log(duration);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
