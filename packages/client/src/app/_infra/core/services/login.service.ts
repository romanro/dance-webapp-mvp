import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '@app/_infra/core/models';
import { UserState } from '@app/_infra/store/state';
import * as UserActions from '@infra/store/actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

import { AuthData, LoginMethod, UserLoginData } from '../models';
import { AlertService } from './alert.service';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  REST_URL = '';

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private http: HttpClient,
    private configService: ConfigurationService,
    private store: Store<UserState>
  ) {}

  login({ email, password }) {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}/login`;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    this.http
      .post<any>(this.REST_URL, { email, password }, { headers })
      .subscribe(
        res => {
          if (res.success === false) {
            this.alertService.error('LOGIN.WrongEmailPassword');
          } else {
            this.storeLoginData(LoginMethod.REGULAR, res);
            this.afterLoginRoute();
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
        // this.storeLoginData(LoginMethod.FACEBOOK);
        console.log('FACEBOOK LOGIN: ', res);
        // this.afterLoginRoute();
      },
      error => {
        this.alertService.error('LOGIN.LoginFailedMsg');
      }
    );
  }

  logout() {
    // window.location.href = '/logout';
    const lm: LoginMethod = JSON.parse(localStorage.getItem('authData')).lm;

    switch (lm) {
      case LoginMethod.FACEBOOK:
        this.authService.signOut();
        break;
    }

    this.clearLoginData();
    this.alertService.info('LOGIN.LogOutMsg');
    this.router.navigate(['/login']);
  }

  storeLoginData(lm: LoginMethod, loginResponse: UserLoginData) {
    const authData: AuthData = {
      token: loginResponse.token,
      loginMethod: lm,
      userId: loginResponse.user.email
    };
    localStorage.setItem('authData', JSON.stringify(authData));
    this.store.dispatch(
      UserActions.CreateUserAction({ user: loginResponse.user })
    );
  }

  clearLoginData() {
    this.store.dispatch(UserActions.ClearUser(null));
    localStorage.removeItem('authData');
  }

  afterLoginRoute() {
    this.alertService.success('LOGIN.LoginSuccessMsg');
    this.router.navigate(['/student']);
  }
}
