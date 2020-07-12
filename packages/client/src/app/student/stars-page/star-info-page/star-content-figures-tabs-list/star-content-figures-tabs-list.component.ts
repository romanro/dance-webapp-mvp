import { ChangeDetectionStrategy, Component, Input, OnInit, } from '@angular/core';
import {  DanceLevel, Figure } from '@core/models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dsapp-star-content-figures-tabs-list',
  templateUrl: './star-content-figures-tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StarContentFiguresTabsListComponent implements OnInit {

  @Input() levels: Array<any> = null;
  @Input() dance: string = null;
  lvl = DanceLevel;

  subs: Array<Subscription> = [];
  figures: Figure[] = null;
  loading = true;

  constructor() {}

  ngOnInit() { 
  }

}
