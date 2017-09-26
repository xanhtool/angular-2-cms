import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSettingComponent } from './navbar-setting.component';

describe('NavbarSettingComponent', () => {
  let component: NavbarSettingComponent;
  let fixture: ComponentFixture<NavbarSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
