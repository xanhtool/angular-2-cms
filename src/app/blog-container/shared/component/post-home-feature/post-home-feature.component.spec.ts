import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHomeFeatureComponent } from './post-home-feature.component';

describe('PostHomeFeatureComponent', () => {
  let component: PostHomeFeatureComponent;
  let fixture: ComponentFixture<PostHomeFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHomeFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
