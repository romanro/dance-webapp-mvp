import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';
import { Subscription } from 'rxjs';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'ui-video-player-wrapper',
  templateUrl: './video-player-wrapper.component.html',
  styles: []
})
export class VideoPlayerWrapperComponent implements OnInit, OnDestroy {

  @Input() src: string;
  @Input() synchronized = false;

  @Output() playerEvent = new EventEmitter();
  @Output() playerStateChange = new EventEmitter();

  playerIsReady = false;
  playerIsPlaying = false;
  playerAPI: VgAPI;

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

    this.play();

    setTimeout(() => { this.stop(); }, 200);


    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlayThrough.subscribe(
        event => {
          this.playerIsReady = true;
          this.playerEvent.emit(event);
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.abort.subscribe(
        event => {
          this.playerIsReady = false;
          this.playerIsPlaying = false;
          this.playerEvent.emit(event);
          this.playerStateChange.emit(this.playerIsPlaying);
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.error.subscribe(
        event => {
          this.playerIsReady = false;
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


  }

  setPlaybackRate(rate: number) {
    this.playbackRate = rate;
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
        this.playerAPI.getDefaultMedia().currentTime += 1;
        break;
      case 'bwd':
        this.playerAPI.getDefaultMedia().currentTime -= 1;
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

  seekTo(time: number) {
    this.playerAPI.seekTime(time);
  }

  getCurrentTime(): number {
    return this.playerAPI.getDefaultMedia().currentTime;
  }

  changePLayBackRate(operator) {
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

}
