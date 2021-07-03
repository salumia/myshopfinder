import { TestBed } from '@angular/core/testing';

import { SendContactService } from './send-contact.service';

describe('SendContactService', () => {
  let service: SendContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
