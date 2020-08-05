import { Component, Input, OnInit } from '@angular/core';
import { StarDanceLevel } from '@app/_infra/core/models';

@Component({
  selector: 'dsapp-levels-tabs',
  templateUrl: './levels-tabs.component.html'
})
export class LevelsTabsComponent implements OnInit {

  @Input() levels: Array<StarDanceLevel>

  constructor() { }

  ngOnInit() {
  }

}
