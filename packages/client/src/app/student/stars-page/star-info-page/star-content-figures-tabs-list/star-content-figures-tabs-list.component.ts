import { ChangeDetectionStrategy, Component, Input, OnInit, } from '@angular/core';
import { Dance, DanceLevel, StarDanceLevel, Figure, StarContent } from '@core/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from '@app/_infra/store/selectors/figures.selectors';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'dsapp-star-content-figures-tabs-list',
  templateUrl: './star-content-figures-tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarContentFiguresTabsListComponent implements OnInit {

  // @Input() starId: string = null;
  @Input() levels: Array<any> = null;
  @Input() test: Array<any> = null;
  @Input() dance: string = null;
  lvl = DanceLevel;

  subs: Array<Subscription> = [];
  figures: Figure[] = null;
  loading = true;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    console.log(this.levels)
  }

  isFigues() {
    console.log(this.levels)
    this.levels.find(element => {
      console.log(element)
      if (element.figures)
        return true;
    })
    return false;
  }

  ngOnDestory() {
    alert('ngOnDestroy fire');
  }


}
