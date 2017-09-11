import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTemplateComponent } from './blog-template.component';

describe('BlogTemplateComponent', () => {
  let component: BlogTemplateComponent;
  let fixture: ComponentFixture<BlogTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
