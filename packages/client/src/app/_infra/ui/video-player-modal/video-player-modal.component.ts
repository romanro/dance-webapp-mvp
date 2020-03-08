import { Component, Input, OnInit } from '@angular/core';
import { Name } from '@core/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VgAPI } from 'videogular2/compiled/core';


@Component({
  selector: 'dsapp-video-player-modal',
  templateUrl: './video-player-modal.component.html',
  styles: []
})
export class VideoPlayerModalComponent implements OnInit {

  @Input() videoURL: string;
  @Input() autoplay = false;
  @Input() title: Name | string;

  isString = true;
  playerAPI: VgAPI;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.isString = (typeof this.title === 'string');
  }

  onPlayerReady(api) {
    this.playerAPI = api;
    if (this.autoplay) {
      this.playerAPI.play();
    }
  }



}
