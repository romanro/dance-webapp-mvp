import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Practice } from '../models';
import { MOCK_PRACTICES } from './../../../_mocks';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  practices = MOCK_PRACTICES;

  constructor() { }

  getPractices(): Observable<Practice[]> {
    console.log('this.practices:', this.practices)

    return of(this.practices);
    // return throwError(['zevel']);
  }

}
