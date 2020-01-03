import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoPlayerWrapperComponent } from '@app/_infra/ui';

@Component({
  selector: 'dsapp-lab-video-tool',
  templateUrl: './lab-video-tool.component.html',
  styles: []
})
export class LabVideoToolComponent implements OnInit {

  @ViewChild('masterPLayer', { static: true }) masterPLayer: VideoPlayerWrapperComponent;
  @ViewChild('studentPLayer', { static: true }) studentPLayer: VideoPlayerWrapperComponent;

  synchronized = false;
  timeDiff = 0;
  playing = false;

  constructor() { }

  ngOnInit() {
  }

  playVideos() {
    [this.masterPLayer, this.studentPLayer].map(p => p.play());
  }

  toggleVideos() {
    if (this.playing) {
      [this.masterPLayer, this.studentPLayer].map(p => p.pause());
    } else {
      [this.masterPLayer, this.studentPLayer].map(p => p.play());
    }
  }

  masterPLayerEvent(event) {
    if (!this.synchronized) {
      return;
    }
  }

  studentPLayerEvent(event) {
    if (!this.synchronized) {
      return;
    }
  }

  masterPLayerStateChange(event) { this.playing = event; }
  studentPLayerStateChange(event) { }

  synchronize() {
    this.synchronized = true;
    this.resetPlayers();
    const masterTime = Math.round(this.masterPLayer.getCurrentTime());
    const studentTime = Math.round(this.studentPLayer.getCurrentTime());
    this.timeDiff = masterTime - studentTime;
    // console.log(this.timeDiff);
  }

  unsynchronize() {
    this.synchronized = false;
    this.resetPlayers();
    this.timeDiff = 0;
  }

  resetPlayers() {
    [this.masterPLayer, this.studentPLayer].map(p => {
      p.pause();
      p.setPlaybackRate(1);
    });
  }

}
