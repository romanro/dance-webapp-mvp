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
          console.log(error);
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
      this.playerAPI.pause();
    } else {
      this.playerAPI.play();
    }
  }

  changePLayBackRate(operator) {
    switch (operator) {
      case 'plus':
        this.playbackRate += 0.1;
        break;
      case 'minus':
        this.playbackRate -= 0.1;
        break;
    }
  }

}
