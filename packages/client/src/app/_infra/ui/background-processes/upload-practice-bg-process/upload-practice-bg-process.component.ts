import { Component, OnInit } from '@angular/core';
import { BaseBgProcessComponent } from '@app/_infra/core/models';

@Component({
  selector: 'ui-upload-practice-bg-process',
  templateUrl: './upload-practice-bg-process.component.html'
})
export class UploadPracticeBgProcessComponent extends BaseBgProcessComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this.process);
  }

}
