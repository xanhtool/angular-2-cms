import { HttpClientModule } from '@angular/common/http';
import { AdminEmailService } from './services/admin-email.service';
import { AdminFileService } from './services/admin-file.service';
import { DragDropService } from './services/drag-drop.service';
import { AdminComponentService } from './services/admin-component.service';
import { AdminPostService } from './services/admin-post.service';
import { SnackbarService } from './services/snackbar.service';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { EventService } from './services/event.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MdInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSharedRoutingModule } from './admin-shared-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {MdDialogModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdTooltipModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import {MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import {MdSlideToggleModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';
import {MdSnackBarModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import { MdTableModule } from '@angular/material';
import { CdkTableModule } from "@angular/cdk/table";
import {MdCardModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdRadioModule} from '@angular/material';
import { ContenteditableModelDirective } from './directives/contenteditable-model.directive';
import { SlugPipe } from './pipes/slug.pipe';
import { MakeDraggableDirective } from './directives/make-draggable.directive';
import { MakeDroppableDirective } from './directives/make-droppable.directive';
import { AdminLoaderComponent } from './components/admin-loader/admin-loader.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AdminSharedRoutingModule,
    MdInputModule,
    ReactiveFormsModule, 
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    MdDialogModule,
    MdButtonModule,
    MdTooltipModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdChipsModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdTabsModule,
    MdTableModule,
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdRadioModule
  ],
  exports: [
    ContenteditableModelDirective,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule, 
    FroalaEditorModule, 
    FroalaViewModule,
    MdDialogModule,
    MdButtonModule,
    MdTooltipModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdChipsModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdTabsModule,
    MdTableModule,
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    UploadButtonComponent,
    MakeDraggableDirective,
    MakeDroppableDirective,
    SlugPipe,
    MdRadioModule,
    AdminLoaderComponent

  ],
  declarations: [
    ContenteditableModelDirective,
    UploadButtonComponent,
    SlugPipe, 
    MakeDraggableDirective, 
    MakeDroppableDirective, AdminLoaderComponent
  ],
  providers: [
    AdminComponentService,
    EventService,
    SnackbarService,
    AdminPostService,
    DragDropService,
    AdminFileService,
    AdminEmailService
  ],
  entryComponents:[]
})
export class AdminSharedModule { }
