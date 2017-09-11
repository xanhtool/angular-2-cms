import { AdminSharedModule } from './../../admin-shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteComponentRoutingModule } from './website-component-routing.module';
import { NavbarSettingComponent } from './navbar-setting/navbar-setting.component';
import { SliderSettingComponent } from './slider-setting/slider-setting.component';
import { FooterSettingComponent } from './footer-setting/footer-setting.component';
import { NavbarTabComponent } from './navbar-setting/shared/navbar-tab/navbar-tab.component';



@NgModule({
  imports: [
    CommonModule,
    WebsiteComponentRoutingModule,
    AdminSharedModule
  ],
  declarations: [NavbarSettingComponent, SliderSettingComponent, FooterSettingComponent, NavbarTabComponent],
})
export class WebsiteComponentModule { }
