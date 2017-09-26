import { AdminSharedModule } from './../../admin-shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdminSharedModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule { }
