import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-step1',
  templateUrl: './registration-step1.component.html',
  styleUrls: ['./registration-step1.component.css']
})
export class RegistrationStep1Component implements OnInit {
  Meeting_location = "Meeting_location";
  orders = [];
  MeetingAgenda = [];
  constructor() { 
 }

  @Input() regForm: FormGroup;

  ngOnInit() {
   
  }

  step1Submitted() {   }
 
}
