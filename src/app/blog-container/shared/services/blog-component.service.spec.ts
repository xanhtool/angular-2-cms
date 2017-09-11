import { TestBed, inject } from '@angular/core/testing';

import { BlogComponentService } from './blog-component.service';

describe('BlogComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogComponentService]
    });
  });

  it('should be created', inject([BlogComponentService], (service: BlogComponentService) => {
    expect(service).toBeTruthy();
  }));
});
