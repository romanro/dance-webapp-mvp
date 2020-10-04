import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ui-video-preview',
  templateUrl: './video-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPreviewComponent implements OnInit, OnDestroy {

  @Input() path: string;
  @Input() poster: string;

  playerAPI: VgAPI;

  deviceInfo: DeviceInfo;

  subs: Subscription[] = [];

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  onPlayerReady(api) {
    this.playerAPI = api;

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlay.subscribe(
        event => {
          this.playerAPI.play();
        }
      )
    );

    this.playerAPI.volume = 0;

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.ended.subscribe(
        event => {
          setTimeout(() => {
            this.playerAPI.seekTime(0);
            this.playerAPI.play();
          }, 4000)
        }
      )
    );

    if (this.deviceInfo.os === 'iOS') {
      setTimeout(() => {

        const element: HTMLElement = document.getElementById('play-btn') as HTMLElement;
        element.click();
      }, 100)
    }
  }

  autoplayVideo() {
    if (this.deviceInfo.os === 'iOS') {
      this.playerAPI.play();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => { s.unsubscribe(); });
  }

}
