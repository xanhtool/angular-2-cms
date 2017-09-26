import { TestBed, async, inject } from '@angular/core/testing';

import { SaveGuard } from './save.guard';

describe('SaveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveGuard]
    });
  });

  it('should ...', inject([SaveGuard], (guard: SaveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
