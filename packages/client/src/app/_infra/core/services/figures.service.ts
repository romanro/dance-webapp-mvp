import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { Figure } from '../models';
import { MOCK_PRACTICES } from './../../../_mocks';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  REST_URL = '';
  figures = MOCK_PRACTICES;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
  ) { }

  getFigures(starId,level, danceType): Observable<Figure[]> {
    const url: string = this.configService.getRestApiURL();
    if (url) {
      this.REST_URL = `${url}figures/star/${starId}?danceType=${danceType}&level=${level}`;
    }
    const headers = this.configService.getGlobalHttpHeaders();
    return this.http.get<Figure[]>(this.REST_URL, {
      headers: headers
    });
  }

}
