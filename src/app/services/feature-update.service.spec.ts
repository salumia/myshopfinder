import { TestBed } from '@angular/core/testing';

import { FeatureUpdateService } from './feature-update.service';

describe('FeatureUpdateService', () => {
  let service: FeatureUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
