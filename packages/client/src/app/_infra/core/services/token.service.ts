import { Injectable } from '@angular/core';

import { AuthTokens } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeTokens(tokens: AuthTokens) {
    localStorage.setItem('token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('expired_at', tokens.expired_at);
  }

  getStoredAccessToken(): string {
    return localStorage.getItem('token');
  }

  checkStoredAccessToken(): boolean {
    const exists = localStorage.getItem('token') !== null;
    return exists;
  }

  deleteStoredTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expired_at');
  }

}
