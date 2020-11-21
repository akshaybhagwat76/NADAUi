import { Http } from '@angular/http';
import {Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { MatSnackBar } from '@angular/material';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';
@Injectable()
   export class WebService{
       BASE_URL= "https://meetingsliveapi.azurewebsites.net/";
      private  messageStore= []; 
      private  messageSubject = new Subject();
      messages = this.messageSubject.asObservable();
     constructor( private http: Http, private sb: MatSnackBar, private auth: AuthService,private router: Router){
        this.getMessages(null);
     }



    async getMessages(user)
    {
          user = (user) ? '/' + user :''; 
           // var response = await this.http.get(this.BASE_URL +'api/planner' + user ).toPromise();  
           var response =   this.http.get(this.BASE_URL +'api/planner' + user ).subscribe(response =>{
            this.messageStore = response.json();
            this.messageSubject.next(this.messageStore);
           }, error=>{
            this.handleError("unable to get  Messages");
           }) ;  
            
               
      
         /*return this.http.get(this.BASE_URL +'api/planner').toPromise();  */
    }

    async postMessage(message)
    { 
        try {
          var response = await this.http.post(this.BASE_URL +'api/planner',message).toPromise();  
          this.messageStore.push(response.json());
          this.messageSubject.next(this.messageStore);
          this.handleError("Added to post  Messages");
        } catch (error) {
           this.handleError("unable to post  Messages");
        } 
          
    }
    getUser()
    {
      var response =   this.http.get(this.BASE_URL +'api/users/me' ,this.auth.tokenHeader ).subscribe(response =>{
        var userData = response.json();
        return userData;
       }, error=>{
        this.handleError("User is not Authenticated.");
        console.log(error);
        this.router.navigate(['/no-access']);
       }) ; 

    }

    saveUser(userData)
    {
      var user=  this.http.post(this.BASE_URL +'api/users/me',userData, this.auth.tokenHeader).map(res => res.json());
     console.log(user);
      return user;

    }
    private handleError(error)
    {
        console.log(error);
        this.sb.open(error, 'close', {duration : 2000});
    }


    async postMeetingRequest(meetingrequest)
    { 
        try {
          var response = await this.http.post(this.BASE_URL +'api/planner',meetingrequest).toPromise();  
          this.messageStore.push(response.json());
          this.messageSubject.next(this.messageStore);
        } catch (error) {
           this.handleError("unable to post  Messages");
        } 
          
    }



}