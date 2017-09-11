import { TestBed, inject } from '@angular/core/testing';

import { SettingControlService } from './setting-control.service';

describe('SettingControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingControlService]
    });
  });

  it('should be created', inject([SettingControlService], (service: SettingControlService) => {
    expect(service).toBeTruthy();
  }));
});
