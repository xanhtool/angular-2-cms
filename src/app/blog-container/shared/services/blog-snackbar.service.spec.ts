import { TestBed, inject } from '@angular/core/testing';

import { BlogSnackbarService } from './blog-snackbar.service';

describe('BlogSnackbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogSnackbarService]
    });
  });

  it('should be created', inject([BlogSnackbarService], (service: BlogSnackbarService) => {
    expect(service).toBeTruthy();
  }));
});
