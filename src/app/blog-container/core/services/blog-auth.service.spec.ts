import { TestBed, inject } from '@angular/core/testing';

import { BlogAuthService } from './blog-auth.service';

describe('BlogAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogAuthService]
    });
  });

  it('should be created', inject([BlogAuthService], (service: BlogAuthService) => {
    expect(service).toBeTruthy();
  }));
});
