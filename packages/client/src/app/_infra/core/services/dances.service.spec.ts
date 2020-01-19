/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DancesService } from './dances.service';

describe('Service: Dances', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DancesService]
    });
  });

  it('should ...', inject([DancesService], (service: DancesService) => {
    expect(service).toBeTruthy();
  }));
});
