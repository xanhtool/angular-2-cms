import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterbarComponent } from './footerbar.component';

describe('FooterbarComponent', () => {
  let component: FooterbarComponent;
  let fixture: ComponentFixture<FooterbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
