import { Injectable } from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
import { ErrorDialogComponent } from './shared/dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class AuthService{
    // BASE_URL= "https://meetingsliveapi.azurewebsites.net/auth";
    BASE_URL= "https://localhost:44330/";

    firstName_key ="firstName";
    lastName_key ="lastName";
    Token_key="token";
    private dialogConfig;

    constructor(private http: Http ,  private router: Router,private dialog: MatDialog,  private sb: MatSnackBar,) {}
ngOnInit()
{
    this.dialogConfig = {
        height: '200px',
        width: '400px',
        disableClose: true,
        data: {}
      }
 }
 
    get name()
    {
        return localStorage.getItem(this.firstName_key)   ;

    }

    get isAuthenticated(){
        return !!localStorage.getItem(this.Token_key);
    }

    get tokenHeader(){
        var header = new Headers({'Authorization': 'Bearer '+ localStorage.getItem(this.Token_key)});
        return new RequestOptions({headers: header}); 
    }
    login(loginData){
        
            this.http.post(this.BASE_URL +'/login' , loginData).subscribe(res =>{
            this.authenticate(res);
            this.router.navigate(['/meetings']);
        }, error=>{
            this.handleError("Cant Login with the above credentials");
            //let dialogRef = this.dialog.open(ErrorDialogComponent, this.dialogConfig);
           }) ;  
            
         
    }
 register(user){
     delete user.ConfirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe( res => {
          this.authenticate(res);
          this.router.navigate(['/']);
    }  );
    
   

}
logout()
{
   localStorage.removeItem(this.Token_key );
   localStorage.removeItem(this.firstName_key);
   localStorage.removeItem(this.lastName_key);
   // go to home
   console.log("logout");
   this.router.navigate(['/meetings']);
}

authenticate(res)
{ 
    var authResponse = res.json();
    if(!authResponse.token)
    return;
   
    localStorage.setItem(this.Token_key ,authResponse.token);
    localStorage.setItem(this.firstName_key ,authResponse.firstName);
   // localStorage.setItem(this.lastName_key,authResponse.lastName);
}

private handleError(error)
{
    console.log(error);
    this.sb.open(error, 'close', {duration : 2000});
}
}