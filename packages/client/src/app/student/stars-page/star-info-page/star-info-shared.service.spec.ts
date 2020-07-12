import { TestBed } from '@angular/core/testing';

import { StarInfoSharedService } from './star-info-shared.service';

describe('StarInfoSharedService', () => {
  let service: StarInfoSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarInfoSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
