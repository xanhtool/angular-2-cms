import { TestBed, inject } from '@angular/core/testing';

import { BlogFileService } from './blog-file.service';

describe('BlogFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogFileService]
    });
  });

  it('should be created', inject([BlogFileService], (service: BlogFileService) => {
    expect(service).toBeTruthy();
  }));
});
