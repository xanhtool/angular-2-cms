import { TestBed, inject } from '@angular/core/testing';

import { AdminEmailService } from './admin-email.service';

describe('AdminEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEmailService]
    });
  });

  it('should be created', inject([AdminEmailService], (service: AdminEmailService) => {
    expect(service).toBeTruthy();
  }));
});
