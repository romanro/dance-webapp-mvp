import { Injectable } from '@angular/core';
import { BaseRestService } from '@core/services/base-rest.service';
import { Observable, of } from 'rxjs';

import { CreatePracticeData, Practice } from '../models';
import { MOCK_PRACTICES } from './../../../_mocks';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  practices = MOCK_PRACTICES;

  constructor(private baseRestService: BaseRestService) { }

  getPractices(): Observable<Practice[]> {
    return of(this.practices);
    // return this.baseRestService.get<PracticeItemsRestResponse>('account/practices').pipe(map(res => {
    //   return res.data ? res.data : [];
    // }));  }
  }

  uploadPractice(data: CreatePracticeData): Observable<any> {
    return this.baseRestService.post('account/practices', data, null, true);
  }

}
