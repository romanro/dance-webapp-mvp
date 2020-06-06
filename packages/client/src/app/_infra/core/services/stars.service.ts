import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Star } from '../models';
import { MOCK_STARS } from './../../../_mocks';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  
  REST_URL = '';
  stars = MOCK_STARS;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
  ) { }



  getStars(): Observable<Star[]> {
    const url: string = this.configService.getRestApiURL();
    if (url) {
      this.REST_URL = `${url}stars`;
    }

    const headers = this.configService.getGlobalHttpHeaders();
    return this.http.get<Star[]>(this.REST_URL, {
      headers: headers
    });
  }

}
