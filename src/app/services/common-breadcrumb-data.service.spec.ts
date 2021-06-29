import { TestBed } from '@angular/core/testing';

import { CommonBreadcrumbDataService } from './common-breadcrumb-data.service';

describe('CommonBreadcrumbDataService', () => {
  let service: CommonBreadcrumbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonBreadcrumbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
