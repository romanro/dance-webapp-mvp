import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Practice, PracticeItemsRestResponse} from '../models';
import { MOCK_PRACTICES } from './../../../_mocks';
import {map} from 'rxjs/operators';
import {BaseRestService} from '@core/services/base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  practices = MOCK_PRACTICES;

  constructor(private baseRestService: BaseRestService) { }

  getPractices(): Observable<Practice[]> {
    return this.baseRestService.get<PracticeItemsRestResponse>('account/practices').pipe(map(res => {
      return res.data ? res.data : [];
    }));  }

}
