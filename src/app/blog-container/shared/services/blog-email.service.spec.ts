import { TestBed, inject } from '@angular/core/testing';

import { BlogEmailService } from './blog-email.service';

describe('BlogEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogEmailService]
    });
  });

  it('should be created', inject([BlogEmailService], (service: BlogEmailService) => {
    expect(service).toBeTruthy();
  }));
});
