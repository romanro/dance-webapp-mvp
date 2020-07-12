import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StarContent, Figure, DanceLevel, StarDanceLevel } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class StarInfoSharedService {

  private starId = new BehaviorSubject('default starId');
  currentStarId = this.starId.asObservable();

  private content = new BehaviorSubject(<StarContent>({}));
  currentContent = this.content.asObservable();

  constructor() { }

  changeStarAndContent(starId:string, content: StarContent){
    this.starId.next(starId);
    this.content.next(content);
  }
}
