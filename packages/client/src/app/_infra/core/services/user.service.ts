import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserRestResponse as UserRestResponse } from '../models';
import { MOCK_USER } from './../../../_mocks';
import { BaseRestService } from './base-rest.service';
import { ConfigurationService } from './configuration.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_URL = '';

  user = MOCK_USER;

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService,
    private baseRestService: BaseRestService
  ) { }

  getUser(): Observable<User> {
    return this.baseRestService.get<UserRestResponse>('account/profile').pipe(map(
      res => {
        if (res.success && res.user) {
          return res.user;
        } else {
          throwError(['zevel']); // TODO: add real error here
        }
      },
      error => {
        throwError([error.message]);
      }

    ));
    // return of(this.user);
    // return throwError(['zevel']);
  }

  patchUser(email: string, user: User): Observable<any> {
    const url: string = this.configService.getRestApiURL();
    if (url) {
      this.REST_URL = `${url}account/profile`;
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
