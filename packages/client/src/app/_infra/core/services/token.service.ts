import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeToken(token: string) {
    console.log('token:', token)
    localStorage.setItem('token', token);
  }

  getStoredToken(): string {
    return localStorage.getItem('token');
  }

  checkStoredToken(): boolean {
    const exists = localStorage.getItem('token') !== null;
    return exists;
  }

  deleteStoredToken() {
    localStorage.removeItem('token');
  }

}
