import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTabComponent } from './navbar-tab.component';

describe('NavbarTabComponent', () => {
  let component: NavbarTabComponent;
  let fixture: ComponentFixture<NavbarTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
