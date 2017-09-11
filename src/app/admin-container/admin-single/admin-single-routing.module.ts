import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';
import { CategoryComponent } from './category/category.component';
import { SettingWebsiteComponent } from './setting-website/setting-website.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminTemplateComponent } from './../admin-core/admin-template/admin-template.component';
import { AuthGuard } from './../admin-core/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  { 
    path: 'admin', 
    redirectTo:'/admin/dashboard',
    pathMatch:'full'
  },
  { 
    path: 'admin', 
    component: AdminTemplateComponent,
    canActivateChild: [AuthGuard],
    children: [
    {
      path:'setting-website',
      component: SettingWebsiteComponent 
    },
    { 
      path: 'category-list', 
      component: CategoryComponent,
    },
    { 
      path: 'faq', 
      component: FaqComponent,
    },
    { 
      path: 'profile', 
      component: ProfileComponent,
    },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminSingleRoutingModule { }
