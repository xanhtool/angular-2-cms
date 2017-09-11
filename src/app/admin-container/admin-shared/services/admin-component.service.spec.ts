import { TestBed, inject } from '@angular/core/testing';

import { AdminComponentService } from './admin-component.service';

describe('AdminComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminComponentService]
    });
  });

  it('should be created', inject([AdminComponentService], (service: AdminComponentService) => {
    expect(service).toBeTruthy();
  }));
});
