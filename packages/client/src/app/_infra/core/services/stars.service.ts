import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Star } from '../models';
import { MOCK_STARS } from './../../../_mocks';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  stars = MOCK_STARS;

  constructor() { }

  getStars(): Observable<Star[]> {
    return of(this.stars);
  }

}
