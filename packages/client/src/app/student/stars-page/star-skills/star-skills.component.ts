import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as SkillsActions from '@app/_infra/store/actions/skills.actions';
import * as selectors from '@app/_infra/store/selectors';
import { StarSkill } from '@core/models/skill.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-skills',
  templateUrl: './star-skills.component.html',
  styles: []
})
export class StarSkillsComponent implements OnInit, OnDestroy {

  @Input() starId: string;

  skills: StarSkill[] = [];
  subs: Subscription[] = [];


  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectSkillByStarId(this.starId)).subscribe(
        skills => {
          this.skills = [...skills];
        }
      )
    );

    this.store.dispatch(SkillsActions.BeginGetSkillsAction());
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }


}
