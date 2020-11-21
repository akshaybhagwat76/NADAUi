import { Component } from '@angular/core'
import { WebService } from '../web.service';
import {ActivatedRoute} from '@angular/router'
import { MeetingRequestWebService } from '../webservice/meetingrequset.webservice';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
    selector: 'meetings',
    templateUrl: './meeting.component.html',
    styles: [`
 
    .mat-card {
       width: 1200px;
   } `]
              

})
export class MeetingComponent{
    data: Observable<Object>;
    Object = Object;
    list =[];
   data2 =[];
   convFormControl: FormGroup; 

    CheckBoxProd: String;
    RoomReqiurements: FormArray;
    FoodandBeverageReqiurements: FormArray;
    OffsiteDinersSpecialReqiurements: FormArray;
    MeetingRoomSpecialReqiurements: FormArray;
    SelectedFunctionType: FormArray;
    itemForm: FormGroup;


    Meeting_location = "Meeting_location";
    orders = [];
    MeetingAgenda = [];
    AttendeeList = [];
    selectedAnswers = [];
    selectedAgenda: String;
    selectedAttendeeList: String;
    MeetingLocations = [];
    selectedMeetingLocations: String;
    servicesNeeded: boolean;
    servicesNeededList = [];
    selectedservicesNeeded: String;
    // Hotels Section 
    HotelReservationList = [];
    selectedHotelReservations: String;
    selectedOtherHotel: boolean;

    TypeOfHotelList = [];
    selectedTypeOfHotel: String;
    BudgetforHotelrooms: String;

    //FOod and Beverage

    FoodFunctions = [];
    selectedFoodFunctions: String;
    SeparateRoomForMeals = [];
    selectedSeparateRoomForMeals: String;
    BudgetforFoodandBeverage: String;

    //Offsite Diners 
    OffSiteDiners = [];
    selectedOffsiteDiners: String;
    OffsiteDinerPrefferedRestaurant: String;
    OffisteDinerPrivateRoom = [];
    selectedOffisteDinerPrivateRoom: String;
    OffisteDinerSectionedOffArea = [];
    selectedOffisteDinerSectionedOffArea: String;

    RestaurantDesiredList = [];
    selectedRestaurantDesired: String;
    selectedRestaurantDesiredOther: boolean;

    MenuDesiredList = [];
    selectedMenuDesired: String;
    EventTypeList = [];
    selectedEventType: String;
    selectedEventTypeOther: boolean;

    OffisteDistanceFromHotel = [];
    selectedffisteDistanceFromHotel: String;

    //Meeting Space

    MeetingSpaceHotel = [];
    selectedMeetingSpaceHotel: String;
    MeetingSpaceHotelNADA = [];
    selectedMeetingSpaceHotelNADA: String;
    atNADALocation = [];
    selectedatNADALocation: String;
    MeetingSpaceatNADALocation: boolean;

    selectedFunctionType: String;
    FunctionTypeList = [];
    FunctionTypeData = [];
    slectedCheckBoxes = [];
    FunctionTypeOther: boolean;
    SelectedFunctionTypeOther: String;

    SetUpRequirementsData = [];
    SetUpRequirementsslectedCheckBoxes = [];

    SelectedEquipmentData = [];
    EquipmentData = [];


    Audiovisual = [];
    selectedatAudiovisual: String;
    BudgetforAudioVisual: string;


    Transportation = [];
    selectedatTransportation: String;
    TransportationRequired: boolean;

    TransportationType = [];
    selectedatTransportationType: String;
    TransportationIndivdualType: boolean;

    TransportationListProvided = [];
    selectedTransportationListProvided: String;

    TransportationPickUpLocation = [];
    selectedTransportationPickUpLocation: String;

    TransportationDropoffLocation = [];
    selectedTransportationDropoffLocation: String;

    //signage misc
    Sinage = [];
    selectedSinage: String;
    MiscBadges = [];
    selectedMiscBadges: String;
    MiscTenentCards = [];
    selectedMiscTenentCards: String;
    OtherComments: String;
    constructor(private fb: FormBuilder,private meetingRequestWebService: MeetingRequestWebService,private webService: WebService, private route:ActivatedRoute ){}
    ngOnInit()
    {
      this.meetingRequestWebService.getUser();
      
      this.convFormControl = this.fb.group({
        MeetingRequestData: new FormGroup({
              NameOfMeeting: new FormControl(null, Validators.required),
              StaffContact: new FormControl(null, Validators.required),
              MeetingDates: new FormControl(null, Validators.required),
              Attendance: new FormControl(null, Validators.required),
              //MeetingAgenda: new FormControl(null, Validators.required),
              MeetingAgendaDate: new FormControl(new Date()),
              AttendeeList: new FormControl(''),
              AttendeeListDate: new FormControl(new Date()),
              MeetingLocations: new FormControl(''),
              selectedMeetingLocations:new FormControl(''),
              selectedAgenda:new FormControl(''),
              selectedAttendeeList: new FormControl(''),
              servicesNeeded : new FormControl(''),
              servicesNeededList: new FormControl(''),
              selectedservicesNeededByUser: new FormControl(''),
              selectedservicesNeeded: new FormControl(''),
  
            }),
          });

        var name = this.route.snapshot.params.name;
      // var data =   this.meetingRequestWebService.getMeetingRequest(name);
     //  this.convFormControl.value =data;
  
         //console.log(data);
       
         //console.log( this.meetingRequestWebService.getMeetingRequest(name) );

         if(name != null)
         {  //this.data.patchValue(this.meetingRequestWebService.getMeetingRequest(name));

            this.convFormControl.patchValue(this.meetingRequestWebService.getMeetingRequest(name));
           // this.data =  this.meetingRequestWebService.loadData(name).pipe(
               // tap(user => console.log(user))
                this.data  =this.meetingRequestWebService.loadData(name);
                
                 console.log(this.data );

                this.convFormControl.valueChanges.subscribe(form => {
                  sessionStorage.setItem('form2', JSON.stringify(form));
                });
                 sessionStorage.setItem('form', JSON.stringify(this.data));
              
//this.convFormControl.patchValue(user)
            //  );
           /* this.meetingRequestWebService.loadData(name).subscribe(user => {
              //  this.convFormControl = this.convFormControl.addControl(Object,user);
              });
              //console.log(this.meetingRequestWebService.getMeetingRequest(name));
             console.log(this.convFormControl.value);
           //  console.log("data end" + name );*/

           let formValues = sessionStorage.getItem('form');

           if (formValues) {
             this.applyFormValues(this.convFormControl, JSON.parse(formValues));
           }
         }
         else
         {
            var data =   this.meetingRequestWebService.getMeetingRequest(name);
         }
         
    }
   
    private applyFormValues (group, formValues) {
        Object.keys(formValues).forEach(key => {
          let formControl = <FormControl>group.controls[key];
           console.log(key + "  here  " + formControl);
           if (formControl instanceof FormGroup) {
           
            console.log(formControl);
            console.log(formValues[key]);
            this.applyFormValues(formControl, formValues[key]);
            
          } else {
            console.log(formValues[key]);
            formControl.setValue(formValues[key]);
          }
        });
      }
      
   /* ngOnInit()
    {
        var name = this.route.snapshot.params.name;
        this.webService.getMessages(name);
        this.webService.messageSubject.subscribe( 
           messages=>{
               this.messages = messages
            })
    }*/

 /* async ngOnInit()
    {
        var response = await this.webService.getPlanner();
         this.planner =response.json();
    }

    planner=[];  */
    
   // messages = [{text: 'some text', owner:'Sai'},{text: 'some data', owner:'Rayaprolu'}];
}