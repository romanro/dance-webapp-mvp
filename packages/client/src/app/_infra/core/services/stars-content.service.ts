import { Injectable } from '@angular/core';
import { StarContent } from '@core/models';
import { Observable, of, throwError } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { HttpClient } from '@angular/common/http';

import { MOCK_STARS_CONTENT } from './../../../_mocks/star-content.mocks';

@Injectable({
  providedIn: 'root'
})
export class StarsContentService {

  REST_URL = '';
  starsContent = MOCK_STARS_CONTENT;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
  ) { }

  getStarsContent(): Observable<StarContent[]> {
    const url: string = this.configService.getRestApiURL();
    if (url) {
      this.REST_URL = `${url}figures/star/all/5ec1046b3ed6f9006670bba2`;
    }
    const headers = this.configService.getGlobalHttpHeaders();
    return this.http.get<StarContent[]>(this.REST_URL, {
      headers: headers
    });

  }

}
