import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {MatButtonModule, MatCheckboxModule,MatCardModule,MatFormFieldModule 
        ,MatInputModule,MatSnackBarModule,MatToolbarModule,MatOptionModule,MatSelectModule, 
         MatRadioModule, MatGridListModule, MatDatepickerModule,MatNativeDateModule
        ,MatMenuModule,  
        MatIconModule,MatTabsModule,MatDialogModule, 
        MatSlideToggleModule, MatTableModule, MatStepperModule,MatAutocompleteModule, MatSidenavModule} from '@angular/material'; 
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RoutingModule } from './routing/routing.module';
import { SharedModule } from './shared/shared.module';

import { RegistrationStep1Component } from './convention/registration-step1/registration-step1.component';
import { RegistrationStep2Component } from './convention/registration-step2/registration-step2.component';
import { RegistrationStep3Component } from './convention/registration-step3/registration-step3.component';
import {MeetingStepperComponent} from './meetings/meetingstepper.component';

import {MeetingRequestComponent} from './meetingrequest/meetingrequest.component';
import {WebService} from './web.service'; 
import {HttpModule} from  '@angular/http'; 
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';  
import { NavigationComponent } from './navigation.component';
import 'hammerjs'; 
import { RegisterComponent } from './register.component';
import { AuthService} from './auth.service';
import { LoginComponent } from './login.component';
import { UserComponent } from './user.component';
import {UpdateMeetingComponent} from './UpdateMeeting/updatemeeting.component';
import {MeetingComponent} from './meetings/meeting.component'

 import {MeetingRequestWebService} from './webservice/meetingrequset.webservice'
 import { ReplacePipe } from './transforms/replace.pipe';

 import { NoAccessomponent } from './error-pages/no-access/no-access';
@NgModule({

  imports: [
    BrowserModule, 
    BrowserAnimationsModule,MatButtonModule, MatCheckboxModule,MatCardModule, MatFormFieldModule , MatStepperModule, 
    HttpModule,MatInputModule,MatSnackBarModule,MatToolbarModule,MatOptionModule,MatSelectModule,MatRadioModule, 
    MatGridListModule,MatDatepickerModule,MatNativeDateModule,MatMenuModule,MatIconModule,MatSlideToggleModule ,MatTabsModule,MatAutocompleteModule,
    MatDialogModule,MatTableModule, FormsModule,ReactiveFormsModule,SharedModule
    ,RoutingModule ,FlexLayoutModule,MatSidenavModule
  ],
  declarations: [AppComponent,NavigationComponent,
     RegisterComponent,LoginComponent,UserComponent,NoAccessomponent,RegistrationStep1Component,RegistrationStep2Component,RegistrationStep3Component,MeetingStepperComponent,MeetingComponent, ReplacePipe,MeetingRequestComponent,UpdateMeetingComponent ],
 
  bootstrap: [AppComponent],
  providers: [WebService,AuthService,MeetingRequestWebService]
})
export class AppModule { }