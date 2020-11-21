import { Component } from '@angular/core'
import {WebService } from './web.service';
  
@Component({
    selector: 'user',
    template:` 
    <mat-card class="card">
    <mat-form-field>
          <input matInput placeholder="First Name" [(ngModel)]= "model.firstName"       />
      </mat-form-field>
  
      <mat-form-field>
          <input matInput placeholder="Last Name" [(ngModel)]= "model.lastName"    />
      </mat-form-field>
      <button mat-button class="primary"  (click)="saveUser(model)">Update  </button>
      </mat-card>

                 `

})
export class UserComponent{
    model ={
        firstName: '',
        lastName:''
    }
    constructor( private webService: WebService){}
 
    ngOnInit()
    {
       /* this.webService.getUser().subscribe(res=> 
            {
                    this.model.firstName = res.firstName;
                    this.model.lastName= res.lastName;
            });*/
    }

    saveUser(userData)
    {
     this.webService.saveUser(userData).subscribe();
    }
}