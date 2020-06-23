import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ui-image-file-picker',
  templateUrl: './image-file-picker.component.html'
})
export class ImageFilePickerComponent implements OnInit {

  @Output() pictureChange = new EventEmitter<Event>();

  deviceInfo = null;
  isDesktop: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isDesktop = this.deviceService.isDesktop();
    console.log(this.deviceInfo, this.isDesktop);
  }

  fileChangeEvent(event: Event): void {
    this.pictureChange.emit(event);
  }

}
