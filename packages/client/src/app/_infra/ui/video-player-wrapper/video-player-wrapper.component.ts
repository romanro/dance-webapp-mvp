import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LabPlayerPlaybackOperator } from '@app/_infra/core/models';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-video-player-wrapper',
  templateUrl: './video-player-wrapper.component.html'
})
export class VideoPlayerWrapperComponent implements OnInit, OnDestroy {

  @Input() src: string;
  @Input() poster: string = null;
  @Input() synchronized = false;
  @Input() preview = true;

  @Output() durationEvent = new EventEmitter<number>();
  @Output() playerEvent = new EventEmitter();
  @Output() playerStateChange = new EventEmitter();
  @Output() clearVideoFile = new EventEmitter();

  playerIsReady = false;
  playerIsPlaying = false;
  playerAPI: VgAPI;

  time = '0';
  playbackRate = 1;

  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.playerIsReady = false;
  }

  ngOnDestroy() {
    this.subs.forEach(s => { s.unsubscribe(); });
  }

  onPlayerReady(api) {
    this.playerAPI = api;
    this.playerAPI.volume = 0;


    this.subs.push(this.playerAPI.getDefaultMedia().subscriptions.loadedMetadata.subscribe(() => {
      /// getting original video duration
      this.durationEvent.emit(this.playerAPI.getDefaultMedia().duration);
    }))


    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlayThrough.subscribe(
        event => {
          this.playerIsReady = true;
          this.playerEvent.emit(event);
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlay.subscribe(
        event => {
          this.playerIsReady = true;
          this.playerEvent.emit(event);
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.abort.subscribe(
        event => {
          this.playerIsPlaying = false;
          this.playerEvent.emit(event);
          this.playerStateChange.emit(this.playerIsPlaying);
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.error.subscribe(
        event => {
          this.playerIsPlaying = false;
          this.playerEvent.emit(event);
          this.playerStateChange.emit(this.playerIsPlaying);
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.playing.subscribe(
        event => {
          this.playerIsPlaying = true;
          this.playerEvent.emit(event);
          this.playerStateChange.emit(this.playerIsPlaying);
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.pause.subscribe(
        event => {
          this.playerIsPlaying = false;
          this.playerEvent.emit(event);
          this.playerStateChange.emit(this.playerIsPlaying);
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.ended.subscribe(
        event => {
          this.playerIsPlaying = false;
          this.playerEvent.emit(event);
          this.playerStateChange.emit(this.playerIsPlaying);
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.seeked.subscribe(
        event => {
          this.playerEvent.emit(event);
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.timeUpdate.subscribe(
        event => {
          this.time = (Math.round(this.getCurrentTime() * 100) / 100).toFixed(2);
          this.playerEvent.emit(event);
        }
      )
    );

  }

  togglePlay() {
    if (this.playerIsPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  jump(direction) {
    switch (direction) {
      case 'fwd':
        this.playerAPI.getDefaultMedia().currentTime += 0.5;
        break;
      case 'bwd':
        this.playerAPI.getDefaultMedia().currentTime -= 0.5;
        break;
    }
  }

  play() {
    this.playerAPI.play();
  }
  pause() {
    this.playerAPI.pause();
  }

  stop() {
    this.pause();
    this.seekTo(0);
  }

  onPanStart(evt) {
    this.pause();
  }

  onPan(evt) {
    const devVelocity = evt.velocityX / 20;
    const seekRatio = devVelocity;
    const time = this.getCurrentTime();
    const seekTo = -(seekRatio) + time;
    this.seekTo(seekTo);
  }

  onTap(evt) {
    this.togglePlay();
  }

  seekTo(time: number) {
    this.playerAPI.seekTime(time);
  }

  getCurrentTime(): number {
    return this.playerAPI.getDefaultMedia().currentTime;
  }

  changePLayBackRate(operator: LabPlayerPlaybackOperator) {
    switch (operator) {
      case 'plus':
        const plus = parseFloat((this.playbackRate + 0.1).toFixed(1));
        this.playbackRate = plus < 10 ? plus : 10;
        break;
      case 'minus':
        const minus = parseFloat((this.playbackRate - 0.1).toFixed(1));
        this.playbackRate = minus > 0.1 ? minus : 0.1;
        break;

      default:
        this.playbackRate = 1;
    }
  }

  clearVideo(): void {
    this.clearVideoFile.emit();
  }

}
