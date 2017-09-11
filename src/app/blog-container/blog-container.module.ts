import { SingleModule } from './single/single.module';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogContainerRoutingModule } from './blog-container-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BlogContainerRoutingModule,
    CoreModule,
    SharedModule,
    SingleModule,
    FeatureModule,
  ],
  declarations: []
})
export class BlogContainerModule { }
