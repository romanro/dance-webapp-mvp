/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StarsContentService } from './stars-content.service';

describe('Service: StarsContent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarsContentService]
    });
  });

  it('should ...', inject([StarsContentService], (service: StarsContentService) => {
    expect(service).toBeTruthy();
  }));
});
