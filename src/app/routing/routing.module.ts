import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component'; 
import { NavigationComponent } from '../navigation.component';

import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../error-pages/server-error/server-error.component';
import { RegisterComponent } from '../register.component';
import { LoginComponent } from '../login.component';
import { UserComponent } from '../user.component';
import {MeetingComponent} from '../meetings/meeting.component';
import {MeetingRequestComponent} from '../meetingrequest/meetingrequest.component';
import {UpdateMeetingComponent} from '../UpdateMeeting/updatemeeting.component';
import { NoAccessomponent } from '../error-pages/no-access/no-access';
const ownerRoutes: Routes = [
    {
        path:'',
        component:MeetingComponent
      },
      {
        path:'meetings',
        component:MeetingComponent
      }
      /*,
      {
        path:'meetings/:name',
        component:MeetingComponent
      }*/
      ,{
        path:'register',
        component:RegisterComponent
      },{
        path:'login',
        component:LoginComponent
      },{
        path:'profile',
        component:UserComponent
      }
    ,{
        path:'no-access',
        component:NoAccessomponent
      },
      {
        path:'meetingrequest',
        component:MeetingRequestComponent
      }, {
        path:'meetingrequest/:name',
        component:MeetingRequestComponent
      },
      {
        path:'updatemeeting',
        component:UpdateMeetingComponent
      }, {
        path:'updatemeeting/:name',
        component:UpdateMeetingComponent
      }
  ];

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(ownerRoutes)
    ],
    exports: [
      RouterModule
    ],
    declarations: []
  })
  export class RoutingModule { }