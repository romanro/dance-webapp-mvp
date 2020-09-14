import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseBgProcessComponent } from '@app/_infra/core/models';
import { PracticesService } from '@core/services';

@Component({
  selector: 'ui-upload-practice-bg-process',
  templateUrl: './upload-practice-bg-process.component.html'
})
export class UploadPracticeBgProcessComponent extends BaseBgProcessComponent implements OnInit {

  constructor(private practicesService: PracticesService) {
    super();
  }

  ngOnInit() {
    console.log(this.process);
    this.practicesService.uploadPractice(this.process.data)
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              const progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              setTimeout(() => {

              }, 1500);
          }
        }
      )
  }

}
