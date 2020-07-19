import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Figure } from '../models';
import { BaseRestService } from './base-rest.service';


@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  constructor(private baseRestService: BaseRestService) { }

  getFigures(starId): Observable<Figure[]> {
    return this.baseRestService.get<Figure[]>(`figures/star/all/${starId}`);
  }

}
