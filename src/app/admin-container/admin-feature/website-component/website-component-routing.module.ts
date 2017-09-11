import { SaveGuard } from './../../admin-shared/services/save.guard';
import { FooterSettingComponent } from './footer-setting/footer-setting.component';
import { SliderSettingComponent } from './slider-setting/slider-setting.component';
import { NavbarSettingComponent } from './navbar-setting/navbar-setting.component';
import { AuthGuard } from './../../admin-core/services/auth.guard';
import { AdminTemplateComponent } from './../../admin-core/admin-template/admin-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'admin',
    component: AdminTemplateComponent,
    canActivateChild: [AuthGuard],
    children:[
       {
          path:'navbar-setting',
          component: NavbarSettingComponent
        },
        {
          path:'slider-setting',
          component: SliderSettingComponent
        },
        {
          path:'footer-setting',
          component: FooterSettingComponent,
          canDeactivate: [SaveGuard]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SaveGuard]
})
export class WebsiteComponentRoutingModule { }
