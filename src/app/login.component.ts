import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'login',
    template: `   
    
    <mat-card class="card"  > 
    <mat-card-header style="flex-direction:column;">
        <mat-card-title>
        Login 
        </mat-card-title>
    </mat-card-header>
    <form [formGroup]="loginData" (ngSubmit)= "login()"  >
    <mat-card-content>

    <mat-form-field class="example-full-width">
          <input matInput placeholder="Email" formControlName= "Email"   type="email"    required />
      </mat-form-field>
  
      <mat-form-field class="example-full-width">
          <input matInput placeholder="Password"
          formControlName= "Password"   type="password"  required  />
      </mat-form-field>
      </mat-card-content>
      <mat-card-actions  style="text-align:center;">
     <button mat-raised-button color="primary"  >Login</button>
     </mat-card-actions>
     </form>  
  </mat-card>
    `,
    styles: [`
 
                .mat-card {
                   width: 800px;
               }
               .card
               {
                 width: 600px;
                 text-align:center; 
               }
               
                
               
                  
                `]

})
export class LoginComponent {
    Token_key = "token";
    loginData;
    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

        this.loginData = fb.group({

            Email: ['', Validators.required],
            Password: ['', Validators.required]
        });
    }


    ngOnInit() {
        if (!!localStorage.getItem(this.Token_key)) {
            console.log("  loggedin ");
            this.router.navigate(['/']);

        }

    }
    login() {
        if (this.loginData.valid) {
            console.log(this.loginData.value);
            this.auth.login(this.loginData.value);
        }
    }


}