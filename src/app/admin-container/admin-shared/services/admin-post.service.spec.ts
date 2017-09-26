import { TestBed, inject } from '@angular/core/testing';

import { AdminPostService } from './admin-post.service';

describe('AdminPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPostService]
    });
  });

  it('should be created', inject([AdminPostService], (service: AdminPostService) => {
    expect(service).toBeTruthy();
  }));
});
