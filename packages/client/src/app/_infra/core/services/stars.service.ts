import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Star, StarsRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  constructor(private baseRestService: BaseRestService) { }

  getStars(): Observable<Star[]> {
    console.log(222222)
    return this.baseRestService.get<StarsRestResponse>('stars').pipe(map(res => {
      return res.data ? res.data : [];
    }));
  }

}
