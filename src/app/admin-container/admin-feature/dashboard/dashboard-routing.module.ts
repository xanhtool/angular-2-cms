import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AuthGuard } from './../../admin-core/services/auth.guard';
import { AdminTemplateComponent } from './../../admin-core/admin-template/admin-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   { 
    path: 'admin', 
    component: AdminTemplateComponent,
    canActivateChild: [AuthGuard],
    children:[
      // { 
      //   path: '', 
      //   redirectTo:'/admin/dashboard',
      //   pathMatch:'full'
      // },
       { 
        path: 'dashboard', 
        component: DashboardHomeComponent,
      },
     
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class DashboardRoutingModule { }
