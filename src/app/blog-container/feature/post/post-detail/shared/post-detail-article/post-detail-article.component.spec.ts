import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailArticleComponent } from './post-detail-article.component';

describe('PostDetailArticleComponent', () => {
  let component: PostDetailArticleComponent;
  let fixture: ComponentFixture<PostDetailArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
