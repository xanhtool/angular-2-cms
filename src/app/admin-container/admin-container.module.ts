import { SaveGuard } from './admin-shared/services/save.guard';
import { AdminFeatureModule } from './admin-feature/admin-feature.module';
import { AdminSingleModule } from './admin-single/admin-single.module';
import { AdminSharedModule } from './admin-shared/admin-shared.module';
import { AdminCoreModule } from './admin-core/admin-core.module';
import { FeatureModule } from './../blog-container/feature/feature.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminContainerRoutingModule } from './admin-container-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AdminContainerRoutingModule,
    AdminCoreModule,
    AdminSharedModule,
    AdminSingleModule,
    AdminFeatureModule,
  ],
  declarations: [],
  providers: [SaveGuard]
})
export class AdminContainerModule { }
