import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StarSkill } from '@core/models/skill.model';

@Component({
  selector: 'dsapp-star-skill-view',
  templateUrl: './star-skill-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarSkillViewComponent implements OnInit {

  @Input() skill: StarSkill;

  constructor() { }

  ngOnInit() {
    console.log(this.skill);
  }

}
