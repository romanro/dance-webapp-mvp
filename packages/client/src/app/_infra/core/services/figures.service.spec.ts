/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FiguresService } from './figures.service';

describe('Service: Figures', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiguresService]
    });
  });

  it('should ...', inject([FiguresService], (service: FiguresService) => {
    expect(service).toBeTruthy();
  }));
});
