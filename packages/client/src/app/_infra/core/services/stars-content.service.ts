import { Injectable } from '@angular/core';
import { StarContent } from '@core/models';
import { Observable, of } from 'rxjs';

import { MOCK_STARS_CONTENT } from './../../../_mocks/star-content.mocks';

@Injectable({
  providedIn: 'root'
})
export class StarsContentService {

  starsContent = MOCK_STARS_CONTENT;

  constructor() { }

  getStarsContent(): Observable<StarContent[]> {
    return of(this.starsContent);
    // return throwError(['zevel']);
  }

}
