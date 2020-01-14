import { Injectable } from '@angular/core';
import { StarSkill } from '@core/models/skill.model';
import { Observable, of } from 'rxjs';

import { MOCK_STAR_SKILLS } from './../../../_mocks/skills.mocks';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skills = MOCK_STAR_SKILLS;

  constructor() { }

  getSkills(): Observable<StarSkill[]> {
    return of(this.skills);
  }
}
