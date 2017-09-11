import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailArticleComponent } from './post-detail/shared/post-detail-article/post-detail-article.component'
@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [PostDetailComponent, PostListComponent, PostDetailArticleComponent],
  providers: []
})
export class PostModule { }
