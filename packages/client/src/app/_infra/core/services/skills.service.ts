import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skills = [];

  constructor() { }

  getSkills(): Observable<any[]> {
    return of(this.skills);
  }
}
