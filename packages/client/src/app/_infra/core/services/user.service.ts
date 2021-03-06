import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserRestResponse as UserRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_URL = '';

  constructor(private baseRestService: BaseRestService) { }

  getUser(): Observable<User> {
    return this.baseRestService.get<UserRestResponse>('account/profile').pipe(
      map(
        res => {
          if (res.success) {
            return res.data;
          } else {
            throwError([res.message]); // TODO: add real error here
          }
        },
        error => {
          throwError(['ERRORS.GeneralBackendError']);
        }
      )
    );
  }



  updateUser(user: User): Observable<User> {

    return this.baseRestService.patch<UserRestResponse>('account/profile', user.profile).pipe(
      map(
        res => {
          if (res.success) {
            return user;
          } else {
            throwError([res.message]); // TODO: add real error here
          }
        },
        error => {
          throwError(['ERRORS.GeneralBackendError']);
        }
      )
    )
  }

}
