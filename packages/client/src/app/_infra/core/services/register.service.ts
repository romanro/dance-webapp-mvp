import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, User } from '@core/models';

import { AlertService } from './alert.service';
import { ConfigurationService } from './configuration.service';
import { LoginService } from './login.service';

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
    private loginService: LoginService
  ) {}

  register(user: User) {
    const config: Configuration = this.configService.getConfiguration();
    if (config) {
      this.REST_URL = `${config.restURL}/signup`;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    this.http
      .post<any>(this.REST_URL, user, { headers })
      .subscribe(
        res => {
          if (res.success) {
            const loginData = { email: user.email, password: user.password };
            this.loginService.login(loginData);
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
}
