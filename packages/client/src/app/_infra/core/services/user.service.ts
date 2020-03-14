import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Configuration, User } from '../models';
import { MOCK_USER } from './../../../_mocks';
import { ConfigurationService } from './configuration.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_URL = '';

  user = MOCK_USER;

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService
  ) { }

  getUser(): Observable<User> {

    return of(this.user);
    // return throwError(['zevel']);
  }

  /* const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}/account/me`;
    } */

  // const headers = new HttpHeaders()
  //   .set('Content-Type', 'application/json')
  //   .set('Accept', '*/*');

  // return this.http.get(this.REST_URL, { headers });

  patchUser(email: string, user: User): Observable<any> {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}/account/profile`;
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    return this.http.post(this.REST_URL, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    this.user = { ...user };
    return of(user);
    // return throwError(['zevel']);
  }

}
