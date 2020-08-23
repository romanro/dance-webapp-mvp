import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Figure, FiguresRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';


@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  constructor(private baseRestService: BaseRestService) { }

  getStarFigures(starId): Observable<Figure[]> {
    return this.baseRestService.get<FiguresRestResponse>(`figures/star/all/${starId}`)
      .pipe(
        map((response) => {
          return response.figures ? response.figures : [];
        })
      );
  }

  getFigure(figureId): Observable<Figure> {
    return this.baseRestService.get<FiguresRestResponse>(`figures/${figureId}`)
      .pipe(
        map((response) => {
          return response.figure ? response.figure : null;
        })
      );
  }

}
