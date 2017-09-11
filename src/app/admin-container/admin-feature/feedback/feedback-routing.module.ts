import { RequestFeatureComponent } from './request-feature/request-feature.component';
import { FixBugComponent } from './fix-bug/fix-bug.component';
import { ValuationComponent } from './valuation/valuation.component';
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
          path:'valuation',
          component: ValuationComponent
        },
        {
          path:'fix-bug',
          component: FixBugComponent
        },
        {
          path:'request-feature',
          component: RequestFeatureComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
