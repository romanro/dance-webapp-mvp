import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dance, DanceLevel, StarDanceLevel, Figure } from '@core/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from '@app/_infra/store/selectors/figures.selectors';
import * as FiguresActions from '@app/_infra/store/actions/figures.actions';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'dsapp-star-content-figures-tabs-list',
  templateUrl: './star-content-figures-tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarContentFiguresTabsListComponent implements OnInit {

  @Input() starId: string = null;
  @Input() level: StarDanceLevel = null;
  @Input() danceType: Dance = null;
  lvl = DanceLevel;
  subs: Array<Subscription> = [];
  figures: Figure[] = null;;
  loading = true;

  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute, ) {



    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationStart") {
        this.route.queryParams.subscribe(params => {
          this.level = params.level;
          this.danceType = params.dance
        });
        this.ngOnInit();
      }
    });

  }

  ngOnInit() {
    // console.log('this.level:', this.level)
    // console.log('this.danceType:', this.danceType)
    this.getFigures();
  }

  getFigures() {
    if (this.level['value'] || this.level && this.danceType) {
      this.subs.push(
        this.store.select(selectors.selectAllFiguresSorted(this.level['value'], this.danceType)).subscribe(
          content => {
            if (content) {
              this.figures = [...content[0]['figures']];
              this.loading = false;
            } else {
              this.store.dispatch(FiguresActions.BeginGetFiguresAction({ starId: this.starId, level: this.level['value'], danceType: this.danceType }));
            }
          }
        )
      );

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
    }


  }



  ngOnDestory() {
    alert('ngOnDestroy fire');
  }
}
