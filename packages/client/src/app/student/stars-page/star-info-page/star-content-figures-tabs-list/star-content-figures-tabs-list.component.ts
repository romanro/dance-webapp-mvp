import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dance, DanceLevel, StarDanceLevel, Figure } from '@core/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from '@app/_infra/store/selectors/figures.selectors';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';


@Component({
  selector: 'dsapp-star-content-figures-tabs-list',
  templateUrl: './star-content-figures-tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarContentFiguresTabsListComponent implements OnInit {

  @Input() level: StarDanceLevel= null;
  @Input() danceType: Dance = null;

  lvl = DanceLevel;
  subs: Array<Subscription> = [];
  figures: Figure[] = null;;
  loading = true;
  // errorMsg: Figure | string = null;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    console.log("this.level", this.level)
    console.log("this.danceType", this.danceType)

    if (this.level && this.danceType) {
      this.subs.push(
        this.store.select(selectors.selectAllFiguresSorted(this.level, this.level)).subscribe(
          content => {
            if (content) {
              console.log("if");
              this.figures = { ...content };
              this.loading = false;
              // this.errorMsg = null;
            } else {
              console.log("else");
              debugger;
              this.store.dispatch(FiguresActions.BeginGetFiguresAction({ level: this.level, danceType: this.danceType }));
            }
          }
        )

      );
    }

  }

}
