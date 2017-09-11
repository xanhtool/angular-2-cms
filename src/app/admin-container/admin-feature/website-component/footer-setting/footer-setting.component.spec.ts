import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSettingComponent } from './footer-setting.component';

describe('FooterSettingComponent', () => {
  let component: FooterSettingComponent;
  let fixture: ComponentFixture<FooterSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
