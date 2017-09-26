import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPostOptionComponent } from './sidenav-post-option.component';

describe('SidenavPostOptionComponent', () => {
  let component: SidenavPostOptionComponent;
  let fixture: ComponentFixture<SidenavPostOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPostOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPostOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
