import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestResponse } from '@app/_infra/core/models';
import { UserState } from '@app/_infra/store/state';
import * as UserActions from '@infra/store/actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';

import { AlertService } from './alert.service';
import { BaseRestService } from './base-rest.service';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private store: Store<UserState>,
    private tokenService: TokenService,
    private baseRestService: BaseRestService
  ) { }

  login({ email, password }) {

    this.baseRestService
      .post<RestResponse>('login', { email, password })
      .subscribe(
        res => {
          if (res.success) {
            this.tokenService.storeToken(res.token);
            this.afterLoginRoute();
          } else if (res.errors) {
            res.errors.forEach(err => {
              const errorStr = `LOGIN.FORM.${err.code}`;
              this.alertService.error(errorStr);
            });
          } else {
            this.alertService.error('LOGIN.LoginFailedMsg');
          }
        },
        error => {
          this.alertService.error('LOGIN.LoginFailedMsg');
        }
      );
  }

  loginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      res => {
        console.log('FACEBOOK LOGIN: ', res);
      },
      error => {
        this.alertService.error('LOGIN.LoginFailedMsg');
      }
    );
  }

  logout() {

    this.tokenService.deleteStoredToken();
    this.alertService.info('LOGIN.LogOutMsg');
    this.router.navigate(['/login']);
  }

  afterLoginRoute() {
    this.alertService.success('LOGIN.LoginSuccessMsg');
    this.router.navigate(['/student']);
  }

  forgotPassword({ email }): Observable<RestResponse> {
    return this.baseRestService.post<RestResponse>('forgot', { email });
  }

  validateResetToken(token: string): Observable<RestResponse> {
    return this.baseRestService.get<RestResponse>(`reset/${token}`);
  }
}
