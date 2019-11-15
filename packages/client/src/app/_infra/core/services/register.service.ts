import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, RegistrationResponse, UserRegistrationData } from '@core/models';

import { AlertService } from './alert.service';
import { ConfigurationService } from './configuration.service';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  REST_URL = '';

  constructor(
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient,
    private configService: ConfigurationService,
    private tokenService: TokenService
  ) { }

  register(user: UserRegistrationData) {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}/signup`;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    this.http
      .post<RegistrationResponse>(this.REST_URL, user, { headers })
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
            this.alertService.error('LOGIN.RegistrationFailedMsg');
          }
        },
        error => {
          this.alertService.error('LOGIN.RegistrationFailedMsg');
        }
      );
  }

  registerFacebook() {
    this.alertService.success('LOGIN.RegisterSuccessMsg');
    this.router.navigate(['/student']);
  }

  afterLoginRoute() {
    this.alertService.success('LOGIN.RegisterSuccessMsg');
    this.router.navigate(['/student']);
  }
}
