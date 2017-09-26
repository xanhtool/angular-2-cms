import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMarketingComponent } from './email-marketing.component';

describe('EmailMarketingComponent', () => {
  let component: EmailMarketingComponent;
  let fixture: ComponentFixture<EmailMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
