import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration } from '../models';
import { ConfigurationService } from './configuration.service';


@Injectable({
  providedIn: 'root'
})
export class BaseRestService {

  REST_URL = '';

  HTTP_HEADERS = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache');

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService
  ) {

  }


  post<T>(endpoint: string, body: any, httpHeadersObj?: HttpHeaders): Observable<T> {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = config.restURL;
    }
    const headersObj: HttpHeaders = httpHeadersObj ? httpHeadersObj : this.HTTP_HEADERS;
    const options = { headers: headersObj, method: 'POST' };
    return this.http.post<T>(`${this.REST_URL}/${endpoint}`, body, options);
  }

}
