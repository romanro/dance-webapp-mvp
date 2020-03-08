import { Injectable } from '@angular/core';
import { MOCK_FIGURES } from '@app/_mocks';
import { Observable, of } from 'rxjs';

import { Figure } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  figures = MOCK_FIGURES;

  constructor() { }

  getFigures(): Observable<Figure[]> {
    return of(this.figures);
  }

}
