import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListTabComponent } from './post-list-tab.component';

describe('PostListTabComponent', () => {
  let component: PostListTabComponent;
  let fixture: ComponentFixture<PostListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
