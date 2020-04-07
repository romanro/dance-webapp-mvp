import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dance, DanceLevel, StarDanceLevel } from '@core/models';


@Component({
  selector: 'dsapp-star-content-figures-tabs-list',
  templateUrl: './star-content-figures-tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarContentFiguresTabsListComponent implements OnInit {

  @Input() levels: Array<StarDanceLevel> = null;
  @Input() dance: Dance = null;

  lvl = DanceLevel;

  constructor() { }

  ngOnInit() {

  }

}
