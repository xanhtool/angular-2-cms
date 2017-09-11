import { AdminSharedModule } from './../../admin-shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostPreviewDialogComponent } from './post-new/shared/post-preview-dialog/post-preview-dialog.component';
import { SidenavPostOptionComponent } from './post-new/shared/sidenav-post-option/sidenav-post-option.component';
import { TagComponent } from './post-new/shared/tag/tag.component';

import { PostListViewComponent } from './post-list/shared/post-list-view/post-list-view.component';
import { PostListTabComponent } from './post-list/shared/post-list-tab/post-list-tab.component';


@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    AdminSharedModule,
   
  ],
  declarations: [PostListComponent, PostNewComponent, PostPreviewDialogComponent, TagComponent, SidenavPostOptionComponent, PostListViewComponent, PostListTabComponent,  ],
  exports: [PostListComponent]
})
export class PostModule { }
