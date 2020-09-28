import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LabPlayerPlaybackOperator } from '@app/_infra/core/models';

@Component({
  selector: 'ui-player-speed-controls',
  templateUrl: './player-speed-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSpeedControlsComponent {

  @Input() playbackRate = 1;
  @Output() changePLayBackRate = new EventEmitter<LabPlayerPlaybackOperator>();
  constructor() { }

  onChangePLayBackRate(operator: LabPlayerPlaybackOperator) {
    this.changePLayBackRate.emit(operator);
  }

}
