import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotfoundComponent } from './admin-notfound.component';

describe('AdminNotfoundComponent', () => {
  let component: AdminNotfoundComponent;
  let fixture: ComponentFixture<AdminNotfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
