import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { SuccessDialogComponent } from '../shared/dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class MeetingRequestWebService {
  //BASE_URL= "https://meetingsliveapi.azurewebsites.net/";
  BASE_URL = "https://localhost:44330/";
  private mettingRequestStore = [];
  private mettingRequestSubject = new Subject();
  meetingrequest = this.mettingRequestSubject.asObservable();

  private dialogConfig;
  private dialogConfigUpdate;

  constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService,
    private dialog: MatDialog, private router: Router) {
    this.getMeetingRequest(null);
  }
  ngOnInit() {

    this.dialogConfigUpdate = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { title: 'Updated Request Successfully.' }
    }

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { title: 'Added Request Successfully.' }
    }
  }

  deleteFile(FileName) {
    // var response = await this.http.get(this.BASE_URL +'api/planner' + user ).toPromise();  
    var response = this.http.get(this.BASE_URL + 'api/MeetingRequest/deleteFile/' + FileName).subscribe(response => {
debugger
    }, error => {
      this.handleError("unable to delete file ");
    });

    /*return this.http.get(this.BASE_URL +'api/planner').toPromise();  */
  }


  async getMeetingRequest(meetingrequest) {
    meetingrequest = (meetingrequest) ? '/' + meetingrequest : '';
    // var response = await this.http.get(this.BASE_URL +'api/planner' + user ).toPromise();  
    var response = this.http.get(this.BASE_URL + 'api/MeetingRequest' + meetingrequest).subscribe(response => {
      this.mettingRequestStore = response.json();
      this.mettingRequestSubject.next(this.mettingRequestStore);
      //this.articles = data['articles'];
      // console.log( this.mettingRequestStore);
      // let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

    }, error => {
      this.handleError("unable to get  Meeting Requests Data");
    });



    /*return this.http.get(this.BASE_URL +'api/planner').toPromise();  */
  }

  async postMeetingRequest2(meetingrequest) {
    try {
      var response = await this.http.post(this.BASE_URL + 'api/MeetingRequest', meetingrequest).toPromise();
      this.mettingRequestStore.push(JSON.stringify(response.json()));
      this.mettingRequestSubject.next(this.mettingRequestStore);
    } catch (error) {
      this.handleError("unable to post  Messages");
    }

  }

  async postMeetingRequest(meetingrequest) {
    /*  try {
        var response = await this.http.post(this.BASE_URL +'api/MeetingRequest'
                                          ,meetingrequest)
                                          .toPromise();  
        this.mettingRequestStore.push(response.json());
        this.mettingRequestSubject.next(this.mettingRequestStore);
/*var response2 =    this.http.post(
this.BASE_URL +'api/MeetingRequest',  meetingrequest )
.subscribe(response =>{
this.mettingRequestStore = response.json();
this.mettingRequestSubject.next(this.mettingRequestStore);
} 


, error=>{
this.handleError("unable to get  Meeting Requests Data");
}) ;
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

 
       /*   */

    var response = this.http.post(this.BASE_URL + 'api/MeetingRequest', meetingrequest).subscribe(response => {
      this.mettingRequestStore = response.json();
      this.mettingRequestSubject.next(this.mettingRequestStore);
      //this.articles = data['articles'];
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      this.router.navigate(['/meetings']);
    }, error => {
      this.handleError("unable to Post  Meeting Requests Data");
    });


  }

  async putMeetingRequest(id, meetingrequest) {

    var response = this.http.put(this.BASE_URL + 'api/MeetingRequest/' + id, meetingrequest).subscribe(response => {
      this.mettingRequestStore = response.json();
      this.mettingRequestSubject.next(this.mettingRequestStore);
      //this.articles = data['articles'];
      console.log(this.dialogConfigUpdate);
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      this.router.navigate(['/meetings']);
    }, error => {
      this.handleError("unable to Update  Meeting Requests Data");
    });

  }
  getUser() {
    /* var userData  = this.http.get(this.BASE_URL +'api/users/me', this.auth.tokenHeader).map(res => res.json()) 
     console.log(userData);
   //  if(userData[0].statusText + "Unauthorized")
    // console.log(userData.status + "sai") ;
     */

    var response = this.http.get(this.BASE_URL + 'api/users/me', this.auth.tokenHeader).subscribe(response => {
      var userData = response.json();
      return userData;
    }, error => {
      this.handleError("User is not Authenticated.");
      console.log(error);
      this.router.navigate(['/login']);
    });

  }

  saveUser(userData) {
    var user = this.http.post(this.BASE_URL + 'api/users/me', userData, this.auth.tokenHeader).map(res => res.json());
    console.log(user);
    return user;

  }
  private handleError(error) {
    console.log(error);
    this.sb.open(error, 'close', { duration: 2000 });
  }

  loadData(meetingrequest) {
    var fun;
    meetingrequest = (meetingrequest) ? meetingrequest : '';

    console.log(meetingrequest);
    var filtered = this.mettingRequestStore.filter(function (item) {
      // console.log(JSON.stringify(item));

      // console.log( item.meetingId + "---"+ item.mameOfMeeting + '@@@===' + meetingrequest); 
      return item.meetingId == meetingrequest;
    });
    console.log("ered");
    console.log(filtered[0]);
    var dd = of<Object>(filtered[0]).pipe(
      delay(2000)
    );

    return filtered[0];
  }


}