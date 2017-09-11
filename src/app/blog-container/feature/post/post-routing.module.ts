import { BlogTemplateComponent } from '../../core/blog-template/blog-template.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NotFoundGuard } from './services/not-found.guard';
import { PostListComponent } from './post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component:BlogTemplateComponent,
    children: [
      {
        path:':subject',
        canActivate:[NotFoundGuard],
        children:[
          
          {
            path:'',
            component:PostListComponent,
          },
          {
            path:':slug',
            component:PostDetailComponent,
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[NotFoundGuard]
})
export class PostRoutingModule { }
