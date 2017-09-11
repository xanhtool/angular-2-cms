import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { SingleRoutingModule } from './single-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [
    CommonModule,
    SingleRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    NotfoundComponent,
  ]
})
export class SingleModule { }
