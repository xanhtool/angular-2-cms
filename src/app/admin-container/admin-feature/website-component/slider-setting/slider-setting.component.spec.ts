import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSettingComponent } from './slider-setting.component';

describe('SliderSettingComponent', () => {
  let component: SliderSettingComponent;
  let fixture: ComponentFixture<SliderSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
