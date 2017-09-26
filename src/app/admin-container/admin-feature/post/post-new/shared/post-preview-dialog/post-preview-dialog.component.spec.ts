import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPreviewDialogComponent } from './post-preview-dialog.component';

describe('PostPreviewDialogComponent', () => {
  let component: PostPreviewDialogComponent;
  let fixture: ComponentFixture<PostPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
