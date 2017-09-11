import { BlogFileService } from './services/blog-file.service';
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { BlogComponentService } from './services/blog-component.service';
import { BlogPostService } from './services/blog-post.service';
import { PostItemComponent } from './component/post-item/post-item.component';
import { SharedRoutingModule } from './shared-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarComponent } from './component/right-sidebar/right-sidebar.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { FormsModule } from "@angular/forms";
import { PostHomeFeatureComponent } from './component/post-home-feature/post-home-feature.component';
import { DraggableDirective } from './directives/draggable.directive';
import { InfiniteScrollerDirective } from './directives/infinite-scroller.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    FroalaViewModule
  ],
  declarations: [RightSidebarComponent, BreadcrumbComponent,PostItemComponent,PostHomeFeatureComponent, DraggableDirective, InfiniteScrollerDirective],
  exports:[RightSidebarComponent,BreadcrumbComponent,PostItemComponent,PostHomeFeatureComponent,FroalaViewModule,DraggableDirective,InfiniteScrollerDirective],
  providers: [BlogPostService, BlogComponentService,BlogFileService]
})
export class SharedModule { }
