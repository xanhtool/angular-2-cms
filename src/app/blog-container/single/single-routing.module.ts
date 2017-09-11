import { BlogTemplateComponent } from '../core/blog-template/blog-template.component';
import { PostDetailComponent } from '../feature/post/post-detail/post-detail.component';
import { PostListComponent } from '../feature/post/post-list/post-list.component';
import { NotFoundGuard } from '../feature/post/services/not-found.guard';

import { HomeComponent } from './home/home.component'
import { NotfoundComponent } from './notfound/notfound.component'
import { AboutComponent } from './about/about.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    // pathMatch: 'full',
    component:BlogTemplateComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'about',
        component:AboutComponent,
      },
      {
        path:'not-found',
        component:NotfoundComponent
      }
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleRoutingModule { }
