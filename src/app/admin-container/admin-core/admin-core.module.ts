import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCoreRoutingModule } from './admin-core-routing.module';
import { AdminTemplateComponent } from './admin-template/admin-template.component';

@NgModule({
  imports: [
    CommonModule,
    AdminCoreRoutingModule
  ],
  declarations: [AdminTemplateComponent],
  providers: [AuthService]
})
export class AdminCoreModule {
  
 }
