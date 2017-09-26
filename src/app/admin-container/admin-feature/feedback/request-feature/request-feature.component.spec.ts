import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFeatureComponent } from './request-feature.component';

describe('RequestFeatureComponent', () => {
  let component: RequestFeatureComponent;
  let fixture: ComponentFixture<RequestFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
