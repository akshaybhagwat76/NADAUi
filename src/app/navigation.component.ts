import { Component } from '@angular/core';
 import{ AuthService } from './auth.service';
@Component({
    selector: 'nav',
    template:`<mat-toolbar color="primary">
                <button mat-button  routerLink="/" >Home</button>
                <button mat-button  routerLink="/meetings">Meetings List</button>
                <button mat-button  routerLink="/form">Meeting Request</button>
                <span style="flex : 1 1 auto"> </span>
                <button mat-button  *ngIf="!auth.isAuthenticated" routerLink="/login">login</button>
                <!--<button mat-button  *ngIf="!auth.isAuthenticated" routerLink="/register">Register</button>-->
                <button mat-button  *ngIf="auth.isAuthenticated" routerLink="/profile">Welcome {{auth.name}}</button>
                <button mat-button  *ngIf="auth.isAuthenticated" (click)="auth.logout()" >Logout</button>
                </mat-toolbar>   
                
                `

})
export class NavigationComponent{
    constructor( private auth: AuthService){


    }
 
}