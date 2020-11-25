import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
 import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
 
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import {HttpModule} from  '@angular/http';  
import { NavigationComponent } from '../navigation.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule ,
    FlexLayoutModule, 
    HttpModule,
  ],
  exports: [
    MaterialModule,
 FlexLayoutModule,
   SuccessDialogComponent,
   ErrorDialogComponent
  ],
  declarations: [
  SuccessDialogComponent, 
    ErrorDialogComponent, ConfirmDialogComponent
  ],
  entryComponents: [
   SuccessDialogComponent,
    ErrorDialogComponent,ConfirmDialogComponent
  ]
})
export class SharedModule { }
