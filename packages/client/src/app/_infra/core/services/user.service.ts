import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration, User } from '../models';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  REST_URL = '';

  constructor(private http: HttpClient, private configService: ConfigurationService) { }

  getUser(id: string): Observable<any> {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}users`;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    const params = new HttpParams().set('_id', id);

    return this.http.get(this.REST_URL, { headers, params });
  }

  patchUser(email: string, user: User): Observable<any> {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}users/${email}`;
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    return this.http.post(this.REST_URL, user, { headers });
  }

}
