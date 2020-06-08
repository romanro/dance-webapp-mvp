import { Injectable } from '@angular/core';
import { StarContent } from '@core/models';
import { Observable, of, throwError } from 'rxjs';

import { MOCK_STARS_CONTENT } from './../../../_mocks/star-content.mocks';

@Injectable({
  providedIn: 'root'
})
export class StarsContentService {

  starsContent = MOCK_STARS_CONTENT;

  constructor() { }

  getStarsContent(): Observable<StarContent[]> {
    console.log(11111)
    return of(this.starsContent);
    // return throwError(['zevel']);
  }

}
