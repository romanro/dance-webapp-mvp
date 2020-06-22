import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Figure } from '../models';
import { MOCK_PRACTICES } from './../../../_mocks';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  figures = MOCK_PRACTICES;

  constructor() { }

  getFigures(): Observable<Figure[]> {
    console.log(33333)
    return of(this.figures);
    // return throwError(['zevel']);
  }

}
