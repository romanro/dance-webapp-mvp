import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '@core/services/';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const authData = JSON.parse(localStorage.getItem('authData'));

    if (authData && authData.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authData.token}`
        }
      });
    }

    return next.handle(request);
  }
}
