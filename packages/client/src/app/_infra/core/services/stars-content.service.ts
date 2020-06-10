import { Injectable } from '@angular/core';
import { StarContent } from '@core/models';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
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

  getStarsContent(starId): Observable<StarContent[]> {
    const url: string = this.configService.getRestApiURL();
    if (url) {
      this.REST_URL = `${url}stars/${starId}`;
    }

    const headers = this.configService.getGlobalHttpHeaders();
    return this.http.get<StarContent[]>(this.REST_URL, {
      headers: headers
    });
    
    // return of(this.starsContent);
    // return throwError(['zevel']);
  }

}
