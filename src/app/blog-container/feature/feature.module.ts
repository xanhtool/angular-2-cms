import { SharedModule } from './../shared/shared.module';
import { PostModule } from './post/post.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutingModule,
    PostModule,
    SharedModule
  ],
  declarations: []
})
export class FeatureModule { }
