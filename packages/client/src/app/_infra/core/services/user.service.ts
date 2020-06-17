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
          if (res.success && res.user) {
            return res.user;
          } else {
            throwError(['zevel']); // TODO: add real error here
          }
        },
        error => {
          throwError([error.message]);
        }
      )
    );
  }



  updateUser(user: User): Observable<User> {

    return this.baseRestService.patch<any>('account/profile', user.profile).pipe(
      map(
        res => {
          if (res.success) {
            return user;
          } else {
            throwError(['zevel']); // TODO: add real error here
          }
        },
        error => {
          throwError([error.message]);
        }
      )
    )
  }

}
