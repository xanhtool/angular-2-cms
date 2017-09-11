import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingWebsiteComponent } from './setting-website.component';

describe('SettingWebsiteComponent', () => {
  let component: SettingWebsiteComponent;
  let fixture: ComponentFixture<SettingWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
