import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRestService } from '@core/services/base-rest.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreatePracticeData, Practice, PracticeItemsRestResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {


  constructor(private baseRestService: BaseRestService) { }

  getPractices(): Observable<Practice[]> {
    // return of(this.practices);
    return this.baseRestService.get<PracticeItemsRestResponse>('account/practices').pipe(map(res => {
      return res.data ? res.data : [];
    }));
  }

  uploadPractice(data: CreatePracticeData): Observable<any> {
    const httpHeadersObj = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    return this.baseRestService.post('account/practices', data, httpHeadersObj, true);
  }

}
