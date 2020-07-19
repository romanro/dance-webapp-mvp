import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Star } from '../models';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  constructor(private baseRestService: BaseRestService) { }

  getStars(): Observable<Star[]> {
    return this.baseRestService.get<Star[]>('stars');
  }

}
