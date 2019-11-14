import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AlertService, LoginService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private alertService: AlertService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // server takes care of session
    // return true;
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData) {
      // logged in so return true
      return true;
    }

    this.alertService.success('ERRORS.SessionIsExpired');
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
