import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSingleRoutingModule } from './admin-single-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingWebsiteComponent } from './setting-website/setting-website.component';
import { CategoryComponent } from './category/category.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    AdminSingleRoutingModule,
    AdminSharedModule
  ],
  declarations: [
    LoginComponent, 
    DashboardComponent, 
    SettingWebsiteComponent, 
    CategoryComponent,FaqComponent, ProfileComponent, 
  ],

})
export class AdminSingleModule { }
