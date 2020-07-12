import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StarContent } from '@core/models';
import { Observable } from 'rxjs';

import { BaseRestService } from '.';

@Injectable({
  providedIn: 'root'
})
export class StarsContentService {

  constructor(
    private baseRestService: BaseRestService
  ) { }

  getStarContent(starId): Observable<StarContent[]> {
    return this.baseRestService.get<StarContent[]>(`stars/${starId}`);
  }

}
