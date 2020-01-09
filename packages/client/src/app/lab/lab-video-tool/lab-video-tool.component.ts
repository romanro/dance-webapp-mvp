import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoPlayerWrapperComponent } from '@app/_infra/ui';
import { VgEvents } from 'videogular2/compiled/core';

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
  playbackRate = 1;

  constructor() { }

  ngOnInit() {
  }


  toggleVideos() {
    if (this.playing) {
      [this.masterPLayer, this.studentPLayer].map(p => p.pause());
    } else {
      this.seekToSyncTime();
      [this.masterPLayer, this.studentPLayer].map(p => p.play());
    }
  }

  masterPLayerEvent(event) {
    if (!this.synchronized) {
      return;
    }
    switch (event.type) {
      case VgEvents.VG_ENDED:
        /// synchronizing when master ended
        this.stop();
        break;
      case VgEvents.VG_SEEKED:
        this.syncStudentPlayer();
        break;
    }
  }

  studentPLayerEvent(event) {
    if (!this.synchronized) {
      return;
    }
    switch (event.type) {
      case VgEvents.VG_ENDED:
        /// synchronizing when master ended
        [this.masterPLayer, this.studentPLayer].map(p => p.pause());
        this.seekToSyncTime(0);
        break;
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

  seekToSyncTime(time?: number) {
    let masterTime = time !== undefined ? time : Math.round(this.masterPLayer.getCurrentTime());
    let studentTime = masterTime - this.timeDiff;

    if (studentTime < 0) {
      studentTime = 0;
      masterTime = this.timeDiff;
    }
    this.masterPLayer.seekTo(masterTime);
    this.studentPLayer.seekTo(studentTime);
  }

  syncStudentPlayer() {
    const masterTime = Math.round(this.masterPLayer.getCurrentTime());
    const studentTime = masterTime - this.timeDiff;
    this.studentPLayer.seekTo(studentTime);
  }

  syncMasterPlayer() {
    const studentTime = Math.round(this.studentPLayer.getCurrentTime());
    const masterTime = studentTime - this.timeDiff;
    this.masterPLayer.seekTo(masterTime);

  }

  resetPlayers() {
    [this.masterPLayer, this.studentPLayer].map(p => {
      p.pause();
      p.changePLayBackRate('default');
    });
    this.playbackRate = 1;
  }

  jump(direction) {
    [this.masterPLayer, this.studentPLayer].map(p => p.jump(direction));
  }

  stop() {
    [this.masterPLayer, this.studentPLayer].map(p => p.pause());
    this.seekToSyncTime(0);
  }

  changePLayBackRate(operator) {
    [this.masterPLayer, this.studentPLayer].map(p => p.changePLayBackRate(operator));
    setTimeout(() => { this.playbackRate = this.masterPLayer.playbackRate; }, 200);
  }

  onPanStart(evt) {
    [this.masterPLayer, this.studentPLayer].map(p => p.pause());
  }

  onPan(evt) {
    const devVelocity = evt.velocityX / 3;
    const seekRatio = Number(devVelocity.toFixed(2));
    const time = Number(this.masterPLayer.playerAPI.getDefaultMedia().currentTime.toFixed(2));
    const seekTo = seekRatio + time;
    this.masterPLayer.seekTo(seekTo);
    this.syncStudentPlayer();

  }

  onTap(evt) {
    this.toggleVideos();
  }

}
