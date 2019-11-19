import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Configuration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private config: Configuration;
  constructor(private httpClient: HttpClient) { }

  load(url: string) {
    return new Promise((resolve) => {
      this.httpClient.get<Configuration>(url).subscribe((result) => {
        this.config = result;
        resolve();
      });
    });
  }
  getConfiguration(): Configuration { return this.config; }

  getGlobalHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');
    return headers;
  }

}





