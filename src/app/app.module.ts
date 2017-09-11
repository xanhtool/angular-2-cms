import { AdminContainerModule } from './admin-container/admin-container.module';
import { BlogContainerModule } from './blog-container/blog-container.module';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment.prod';
import 'hammerjs';
import 'firebase/storage';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AdminContainerModule,
    BlogContainerModule,
    AppRoutingModule,
  ],
  providers: [
    Title, Meta
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
