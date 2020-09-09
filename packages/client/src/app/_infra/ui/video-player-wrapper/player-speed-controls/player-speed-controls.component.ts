import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabPlayerPlaybackOperator } from '@app/_infra/core/models';

@Component({
  selector: 'ui-player-speed-controls',
  templateUrl: './player-speed-controls.component.html'
})
export class PlayerSpeedControlsComponent implements OnInit {

  @Input() playbackRate = 1;
  @Output() changePLayBackRate = new EventEmitter<LabPlayerPlaybackOperator>();
  constructor() { }

  ngOnInit() {
  }

  onChangePLayBackRate(operator: LabPlayerPlaybackOperator) {
    this.changePLayBackRate.emit(operator);
  }

}
