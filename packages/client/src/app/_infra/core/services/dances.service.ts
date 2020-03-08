import { Injectable } from '@angular/core';
import { MOCK_DANCES } from '@app/_mocks';
import { Dance } from '@core/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DancesService {

  dances = MOCK_DANCES;

  constructor() { }

  getDances(): Observable<Dance[]> {
    return of(this.dances);
  }
}
