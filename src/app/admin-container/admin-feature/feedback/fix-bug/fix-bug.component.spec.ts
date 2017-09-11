import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixBugComponent } from './fix-bug.component';

describe('FixBugComponent', () => {
  let component: FixBugComponent;
  let fixture: ComponentFixture<FixBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
