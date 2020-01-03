import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';
import { Subscription } from 'rxjs';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'ui-video-player-wrapper',
  templateUrl: './video-player-wrapper.component.html',
  styles: []
})
export class VideoPlayerWrapperComponent implements OnInit, OnDestroy {

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
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlayThrough.subscribe(
        () => {
          this.playerIsReady = true;
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.abort.subscribe(
        (error) => {
          this.playerIsReady = false;
          this.playerIsPlaying = false;
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.error.subscribe(
        () => {
          this.playerIsReady = false;
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.playing.subscribe(
        () => {
          this.playerIsPlaying = true;
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.pause.subscribe(
        () => {
          this.playerIsPlaying = false;
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
          this.playerIsPlaying = false;
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
    this.playerAPI.pause();
    this.playerAPI.seekTime(0);
  }

  seekTo(time: number) {
    this.playerAPI.seekTime(time);
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
