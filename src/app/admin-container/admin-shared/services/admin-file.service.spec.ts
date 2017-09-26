import { TestBed, inject } from '@angular/core/testing';

import { AdminFileService } from './admin-file.service';

describe('AdminFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminFileService]
    });
  });

  it('should be created', inject([AdminFileService], (service: AdminFileService) => {
    expect(service).toBeTruthy();
  }));
});
