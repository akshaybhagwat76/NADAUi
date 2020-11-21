import { Component } from '@angular/core';
 
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from './auth.service';
@Component({
    
    //used if there is issue to find tempalte url 
   // moduleId: module.id,
     selector: 'register',
    templateUrl:'register.component.html',
    styles:[`
            .error{
                background-color:#fff0f0;
            }
    `]
})
export class RegisterComponent { 
     form;
    constructor(private fb: FormBuilder, private auth: AuthService)
    {
        this.form= fb.group({
            LastName:['', Validators.required],
            FirstName:['', Validators.required],
            Email:['', Validators.required , emailValid()],
            Password:['', Validators.required], 
            ConfirmPassword:['', Validators.required]
        },{validator :mismatchingFields('Password','ConfirmPassword')});  
    }

    onSubmit(){

        console.log(this.form.errors); 
        console.log(this.form.value); // 
        this.auth.register(this.form.value);
    }
    isValid(control)
    {
        return this.form.controls[control].invalid && this.form.controls[control].touched ;
    }
 }


 function mismatchingFields( field1 , field2)
 {

    return form =>{
        if(form.controls[field1].value !== form.controls[field2].value)
           return { mismatchingFields: true}
    } 
 }

 function emailValid() {
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(control.value) ? null : { invalidEmail: true }
    }
}
