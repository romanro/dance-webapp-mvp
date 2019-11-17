import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationResponse, UserRegistrationData } from '@core/models';

import { AlertService } from './alert.service';
import { BaseRestService } from './base-rest.service';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  REST_URL = '';

  constructor(
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService,
    private baseRestService: BaseRestService
  ) { }

  register(user: UserRegistrationData) {
    this.baseRestService
      .post<RegistrationResponse>('signup', user)
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
