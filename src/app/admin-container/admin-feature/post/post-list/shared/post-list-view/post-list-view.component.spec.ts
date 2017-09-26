import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListViewComponent } from './post-list-view.component';

describe('PostListViewComponent', () => {
  let component: PostListViewComponent;
  let fixture: ComponentFixture<PostListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
