import { FeedbackModule } from './feedback/feedback.module';
import { WebsiteComponentModule } from './website-component/website-component.module';
// import { DialogPreviewComponent } from './../admin-shared/component/dialog-preview/dialog-preview.component';
import { PostModule } from './post/post.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFeatureRoutingModule } from './admin-feature-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AdminFeatureRoutingModule,
    DashboardModule,
    PostModule,
    WebsiteComponentModule,
    FeedbackModule
  ],
  declarations: [],
  // declarations: [DialogPreviewComponent],
  // entryComponents:[DialogPreviewComponent]
})
export class AdminFeatureModule { }
