import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoaderComponent } from './admin-loader.component';

describe('AdminLoaderComponent', () => {
  let component: AdminLoaderComponent;
  let fixture: ComponentFixture<AdminLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
