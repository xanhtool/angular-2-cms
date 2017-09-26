import { SaveGuard } from './../../admin-shared/services/save.guard';
import { PostNewComponent } from './post-new/post-new.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthGuard } from './../../admin-core/services/auth.guard';
import { AdminTemplateComponent } from './../../admin-core/admin-template/admin-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { 
    path: 'admin', 
    component: AdminTemplateComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'post-list', component: PostListComponent },
      { path: 'post-new', component: PostNewComponent,canDeactivate: [SaveGuard] },
      { path: 'post-edit', children: [
        {
          path: ':slug',
          component: PostNewComponent
        }
      ]},
      { path: 'draft-edit', children: [
        {
          path: ':slug',
          component: PostNewComponent
        }
      ]},
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PostRoutingModule { }
