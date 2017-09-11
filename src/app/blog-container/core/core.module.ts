import { BlogAuthService } from './services/blog-auth.service';
import { SharedModule } from './../shared/shared.module';
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { BlogTemplateComponent } from './blog-template/blog-template.component';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { SliderComponent } from './slider/slider.component';
@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FroalaViewModule,
    SharedModule
  ],
  declarations: [NavbarComponent, FooterbarComponent, SliderComponent,BlogTemplateComponent],
  exports: [NavbarComponent, FooterbarComponent, SliderComponent],
  providers: [BlogAuthService]
})
export class CoreModule {
 }
