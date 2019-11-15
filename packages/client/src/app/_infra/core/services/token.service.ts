import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getStoredToken(): string {
    return localStorage.getItem('token');
  }

  checkToken(): boolean {
    const exists = localStorage.getItem('token') !== null;
    return exists;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

}
