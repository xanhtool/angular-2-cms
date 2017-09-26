import { AdminSharedModule } from './../../admin-shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { ValuationComponent } from './valuation/valuation.component';
import { RequestFeatureComponent } from './request-feature/request-feature.component';
import { FixBugComponent } from './fix-bug/fix-bug.component';

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    AdminSharedModule
  ],
  declarations: [ValuationComponent, RequestFeatureComponent, FixBugComponent]
})
export class FeedbackModule { }
