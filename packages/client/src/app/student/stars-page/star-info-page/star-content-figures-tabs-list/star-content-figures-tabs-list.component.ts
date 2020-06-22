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

  @Input() starId: string = null;
  @Input() level: StarDanceLevel= null;
  @Input() danceType: Dance = null;

  lvl = DanceLevel;
  subs: Array<Subscription> = [];
  figures: Figure[] = null;;
  loading = true;

  constructor(private store: Store<any>) { }

  ngOnInit() {

    if (this.level && this.danceType) {
      this.subs.push(
        this.store.select(selectors.selectAllFiguresSorted(this.level, this.level)).subscribe(
          content => {
            if (content) {
              console.log("iff selectAllFiguresSorted")
              this.figures = { ...content };
              this.loading = false;
            } else {
              console.log("else selectAllFiguresSorted")

              this.store.dispatch(FiguresActions.BeginGetFiguresAction({ starId: this.starId, level: this.level, danceType: this.danceType }));
            }
          }
        )

      );
    }
    this.subs.push(
      this.store.select(
        selectors.selectFiguresError()).subscribe(res => {
          if (res && res.type) {
            this.figures = null;
            this.loading = false;
            // this.errorMsg = this.errorService.alertStarsContentError(res.type);
          }
        })
    );

    console.log("this.fuguires", this.figures);
    

  }

}
