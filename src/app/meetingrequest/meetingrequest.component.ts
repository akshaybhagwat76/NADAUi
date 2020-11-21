import { Component } from '@angular/core'
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router'
import { MeetingRequestWebService } from '../webservice/meetingrequset.webservice';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Location } from '@angular/common';

@Component({
    selector: 'meetingrequest',
    templateUrl: './meetingrequest.component.html',
    styles: [`
 
 .mat-card {
    width: 1200px;
}

 
.specailMatcard
{
    width:auto;width: auto;
    margin: 4px;
}
   
 `]

})
export class MeetingRequestComponent {
    data: Observable<Object>;
    Object = Object;
    list = [];
    data2 = [];
    registrationForm: FormGroup;
    listOfFiles = [];
    meetingFile: any; AgendaFile: {};
    CheckBoxProd: String;
    isAgendaFile: boolean = false;
    ////
    HotelRoomReqiurements: FormArray;
    FoodandBeverageReqiurements: FormArray;
    OffsiteDinersSpecialReqiurements: FormArray;
    MeetingRoomSpecialReqiurements: FormArray;
    SelectedFunctionType: FormArray;
    itemForm: FormGroup;
    ////
    NameOfMeeting: [];
    MeetingDates: String;
    StaffContact: String;
    Attendance: String;


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
    selectedservicesNeededByUser: String;
    // Hotels Section 
    HotelReservationList = [];
    selectedHotelReservations: String;
    selectedOtherHotel: boolean;
    TypeOfHotelList = [];
    selectedTypeOfHotel: String;
    BudgetforHotelrooms: String;

    //Food and Beverage
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

    //Transpotation 
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


    constructor(private fb: FormBuilder,
        private meetingRequestWebService: MeetingRequestWebService, private auth: AuthService,
        private webService: WebService, private location: Location, private route: ActivatedRoute) {

        this.HotelRoomReqiurements = this.fb.array([]);
        this.FoodandBeverageReqiurements = this.fb.array([]);
        this.OffsiteDinersSpecialReqiurements = this.fb.array([]);
        this.MeetingRoomSpecialReqiurements = this.fb.array([]);
    }
    ngOnInit() {

        this.meetingRequestWebService.getUser();

        this.registrationForm = this.fb.group({
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
                selectedMeetingLocations: new FormControl(null, Validators.required),
                selectedAgenda: new FormControl(''),
                selectedAttendeeList: new FormControl(null, Validators.required),
                servicesNeeded: new FormControl(''),
                servicesNeededList: new FormControl(''),
                selectedservicesNeededByUser: new FormControl(''),
                selectedservicesNeeded: new FormControl(''),

            }),
            HotelReservations: new FormGroup({
                selectedHotelReservations: new FormControl(null),
                HotelReservationList: new FormControl(''),
                servicesNeededList: new FormControl(''),
                TypeOfHotelList: new FormControl(''),
                selectedTypeOfHotel: new FormControl(''),
                BudgetforHotelrooms: new FormControl(''),
            }),
            FoodBeverage: new FormGroup({
                FoodFunctions: new FormControl(''),
                selectedFoodFunctions: new FormControl(Number),
                SeparateRoomForMeals: new FormControl(''),
                selectedSeparateRoomForMeals: new FormControl(Number),
                BudgetforFoodandBeverage: new FormControl(Number),
            }),
            OffSiteDinersData: new FormGroup({
                OffSiteDiners: new FormControl(''),
                selectedOffsiteDiners: new FormControl(Number),
                OffsiteDinerPrefferedRestaurant: new FormControl(''),
                OffisteDinerPrivateRoom: new FormControl(Number),
                selectedOffisteDinerPrivateRoom: new FormControl(Number),
                OffisteDinerSectionedOffArea: new FormControl(''),
                selectedOffisteDinerSectionedOffArea: new FormControl(Number),
                RestaurantDesiredList: new FormControl(''),
                selectedRestaurantDesired: new FormControl(''),

                selectedMenuDesired: new FormControl(''),

                selectedEventType: new FormControl(''),
                OffisteDistanceFromHotel: new FormControl(''),
                selectedffisteDistanceFromHotel: new FormControl(''),
                OtherOffSiteDiner: new FormControl(''),

            }),
            MeetingSpace: new FormGroup({
                MeetingSpaceHotel: new FormControl(''),
                selectedMeetingSpaceHotel: new FormControl(Number),
                MeetingSpaceHotelNADA: new FormControl(Number),
                selectedMeetingSpaceHotelNADA: new FormControl(Number),

                atNADALocation: new FormControl(''),
                selectedatNADALocation: new FormControl(''),
                selectedFunctionFunctionTypeListType: new FormControl(''),
                FunctionTypeData: this.mapToCheckboxArrayGroup(this.FunctionTypeData),
                FunctionTypeList: new FormControl(''),

                SelectedFunctionTypeOther: new FormControl(''),
                SetUpRequirementsData: new FormControl(''),

                Audiovisual: new FormControl(''),
                selectedatAudiovisual: new FormControl(Number),

                SelectedEquipmentData: new FormControl(''),
                EquipmentData: new FormControl(''),
                BudgetforAudioVisual: new FormControl(''),
            }),
            Transpotation: new FormGroup({

                selectedatTransportation: new FormControl(Number),
                selectedatTransportationType: new FormControl(''),
                selectedTransportationListProvided: new FormControl(Number),
                TransportationDropoffLocation: new FormControl(''),
                selectedTransportationDropoffLocation: new FormControl(''),
                TransportationPickUpLocation: new FormControl(''),
                selectedTransportationPickUpLocation: new FormControl(''),
            }),
            Signage: new FormGroup({
                selectedSinage: new FormControl(Number),
            }),
            Misc: new FormGroup({

                selectedMiscBadges: new FormControl(Number),
                selectedMiscTenentCards: new FormControl(Number),
                OtherComments: new FormControl(''),
            }),


            /*signatureReq: [''],
             selectedAgenda: [],
             selectedAttendeeList: [],
             selectedMeetingLocations: [],
             selectedservicesNeeded: [],
             selectedHotelReservations: [],
             HotelReservationList: ['', Validators.required],
             servicesNeededList: ['', Validators.required],
             TypeOfHotelList: ['', Validators.required],
             selectedTypeOfHotel: [],
             //items: [null, Validators.required],
             //items_value: ['no', Validators.required],
             BudgetforHotelrooms: [],
             FoodFunctions: ['', Validators.required],
             selectedFoodFunctions: [],
             SeparateRoomForMeals: ['', Validators.required],
             selectedSeparateRoomForMeals: [],
             BudgetforFoodandBeverage: [],
             OffSiteDiners: ['', Validators.required],
             selectedOffsiteDiners: [],
             OffsiteDinerPrefferedRestaurant: [],
             OffisteDinerPrivateRoom: ['', Validators.required],
             selectedOffisteDinerPrivateRoom: [],
             OffisteDinerSectionedOffArea: ['', Validators.required],
             selectedOffisteDinerSectionedOffArea: [],
             RestaurantDesiredList: ['', Validators.required],
             selectedRestaurantDesired: [],
             MenuDesiredList: [''],
             selectedMenuDesired: [],
             EventTypeList: [''],
             selectedEventType: [],
      
             OffisteDistanceFromHotel: ['', Validators.required],
             selectedffisteDistanceFromHotel: [],
             OtherOffSiteDiner: [],
      
      
             MeetingSpaceHotel: ['', Validators.required],
             selectedMeetingSpaceHotel: [],
             MeetingSpaceHotelNADA: ['', Validators.required],
             selectedMeetingSpaceHotelNADA: [],
      
             atNADALocation: [''],
             selectedatNADALocation: [],
             // // Password:['', Validators.required], 
             // ConfirmPassword:['', Validators.required]
             selectedFunctionFunctionTypeListType: new FormControl(false),
            // FunctionTypeData: this.mapToCheckboxArrayGroup(this.FunctionTypeData),
             FunctionTypeList: new FormArray([]),
      
             SelectedFunctionTypeOther: [],
             SetUpRequirementsData: new FormArray([]),
      
             Audiovisual: [''],
             selectedatAudiovisual: [],
      
             SelectedEquipmentData: [],
             EquipmentData: new FormArray([]),
             BudgetforAudioVisual: [],
      
             Transportation: [],
             selectedatTransportation: [],
      
             TransportationType: [''],
             selectedatTransportationType: [],
      
             TransportationListProvided: [''],
             selectedTransportationListProvided: [],
      
             TransportationDropoffLocation: ['', Validators.required],
             selectedTransportationDropoffLocation: [],
      
             TransportationPickUpLocation: ['', Validators.required],
             selectedTransportationPickUpLocation: [],
      
             Sinage: [''],
             selectedSinage: [],
             MiscBadges: [''],
             selectedMiscBadges: [],
             MiscTenentCards: [''],
             selectedMiscTenentCards: [],
      
             OtherComments: [],
               */


        });

        this.registrationForm.addControl('HotelRoomReqiurements', this.HotelRoomReqiurements);
        this.registrationForm.addControl('FoodandBeverageReqiurements', this.FoodandBeverageReqiurements);
        this.registrationForm.addControl('OffsiteDinersSpecialReqiurements', this.OffsiteDinersSpecialReqiurements);
        this.registrationForm.addControl('MeetingRoomSpecialReqiurements', this.MeetingRoomSpecialReqiurements);


        of(this.getOrders()).subscribe(orders => {
            this.MeetingAgenda = orders;

            console.log(this.MeetingAgenda);
            console.log("this.MeetingAgenda");
            console.log(this.registrationForm);
            console.log(this.registrationForm.controls.MeetingAgenda);
            //this.registrationForm.controls.MeetingAgenda.patchValue(this.MeetingAgenda[0].id);
            this.AttendeeList = orders;
            this.FoodFunctions = orders;
            this.SeparateRoomForMeals = orders;

            this.OffSiteDiners = orders;
            this.OffisteDinerPrivateRoom = orders;
            this.OffisteDinerSectionedOffArea = orders;

            this.MeetingSpaceHotel = orders;
            this.MeetingSpaceHotelNADA = orders;

            this.Audiovisual = orders;
            this.Transportation = orders;
            this.TransportationListProvided = orders;

            this.Sinage = orders;
            this.MiscBadges = orders;
            this.MiscTenentCards = orders;

            //this.registrationForm.controls.AttendeeList.patchValue(this.AttendeeList[0].id);
        });
        of(this.getMeetingLocations()).subscribe(locations => {
            this.MeetingLocations = locations;
            //  this.registrationForm.controls.MeetingLocations.patchValue(this.MeetingLocations[0].id);
        });
        of(this.getServicesNeeded()).subscribe(options => {
            this.servicesNeededList = options;
            //this.convFormControl.controls.servicesNeededList.patchValue(this.servicesNeededList[0].id);
        });

        of(this.getHotelReservations()).subscribe(options => {
            this.HotelReservationList = options;
            // this.convFormControl.controls.HotelReservationList.patchValue(this.HotelReservationList[0].id);
        });
        of(this.getTypeOfHotel()).subscribe(options => {
            this.TypeOfHotelList = options;
            // this.convFormControl.controls.TypeOfHotelList.patchValue(this.TypeOfHotelList[0].id);

        });
        of(this.getRestaurantDesired()).subscribe(options => {
            this.RestaurantDesiredList = options;

        });

        of(this.getRequirementsOnDistance()).subscribe(options => {
            this.EventTypeList = options;

        });
        of(this.getOffisteDistanceFromHotel()).subscribe(options => {
            this.OffisteDistanceFromHotel = options;

        });
        of(this.getMenuDesired()).subscribe(options => {
            this.MenuDesiredList = options;

        });

        of(this.getFunctionType()).subscribe(locations => {
            this.FunctionTypeData = locations;
            this.addCheckboxes();
        });
        of(this.getatNADALocation()).subscribe(locations => {
            this.atNADALocation = locations;
        });

        of(this.getSetupRequirements()).subscribe(locations => {
            this.SetUpRequirementsData = locations;
            this.addCheckboxes();
        });
        of(this.getEquipmentData()).subscribe(locations => {
            this.EquipmentData = locations;
            this.addCheckboxes();
        });

        of(this.getTranspotationIndividuals()).subscribe(locations => {
            this.TransportationType = locations;
        });

        of(this.getTranspotationLocationDetails()).subscribe(locations => {
            this.TransportationPickUpLocation = locations;

            this.TransportationDropoffLocation = locations;

        });

        /*
         Use this to Preload the Data */
        var name = this.route.snapshot.params.name;
        if (name != null) {  //this.data.patchValue(this.meetingRequestWebService.getMeetingRequest(name));

            this.registrationForm.patchValue(this.meetingRequestWebService.getMeetingRequest(name));
            // this.data =  this.meetingRequestWebService.loadData(name).pipe(
            // tap(user => console.log(user))
            this.data = this.meetingRequestWebService.loadData(name);
            this.
                registrationForm.valueChanges.subscribe(form => {
                    sessionStorage.setItem('form2', JSON.stringify(form));
                });
            //  let formValues2 = sessionStorage.getItem('form2');
            // sessionStorage.setItem('form', formValues2);
            let formValues = sessionStorage.getItem('form3');



            if (formValues) {
                this.applyFormValues(this.registrationForm, JSON.parse(formValues));
            }
        }
        else {
            var data = this.meetingRequestWebService.getMeetingRequest(name);
        }

    }

    handelMeetingFileInput(event) {
        this.isAgendaFile=false;
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                debugger
                var last_dot = event.target.files[i].name.lastIndexOf('.');
                var ext1 = "." + event.target.files[i].name.slice(last_dot + 1);

                var fName = event.target.files[i].name.substr(0, event.target.files[i].name.lastIndexOf('.'));
                var contentType = event.target.files[i].type;
                var reader = new FileReader();


                reader.onload = (event: any) => {
                    if(this.listOfFiles.length>0){
                        let index = this.listOfFiles.findIndex(x=>x.IsAgendaFile==false);
                        if(index!=-1){

                            this.listOfFiles.splice(index,1);
                        }
                    }
                    this.listOfFiles.push({
                        FileName: fName,
                        ContentType: contentType,   
                        Extension: ext1,
                        FileBytes: event.target.result,
                        IsAgendaFile: false
                    })
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    handelAgendaFileInput(event) {
        this.isAgendaFile=true;
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                debugger
                var last_dot = event.target.files[i].name.lastIndexOf('.');
                var ext1 = "." + event.target.files[i].name.slice(last_dot + 1);

                var fName = event.target.files[i].name.substr(0, event.target.files[i].name.lastIndexOf('.'));
                var contentType = event.target.files[i].type;
                var reader = new FileReader();


                reader.onload = (event: any) => {
                    debugger

                    if(this.listOfFiles.length>0){
                        let index = this.listOfFiles.findIndex(x=>x.IsAgendaFile==true);
                        if(index!=-1){

                            this.listOfFiles.splice(index,1);
                        }
                    }
                    this.listOfFiles.push({
                        FileName: fName,
                        ContentType: contentType,   
                        Extension: ext1,
                        FileBytes: event.target.result,
                        IsAgendaFile: true
                    })
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    private applyFormValues(group, formValues) {
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
    public SaveChanges = (registrationForm) => {

        this.registrationForm.controls.MeetingSpace.value.FunctionTypeList = this.slectedCheckBoxes;
        this.registrationForm.controls.MeetingSpace.value.SetUpRequirementsData = this.SetUpRequirementsslectedCheckBoxes;
        this.registrationForm.controls.MeetingSpace.value.EquipmentData = this.SelectedEquipmentData;

        if (this.registrationForm.valid) {
            console.log(this.registrationForm.value);
            console.log("here");
            //check if all int's are not null 
            if (!this.selectedatAudiovisual) {
                console.log("empty -->selectedatAudiovisual");

            }
            console.log("selectedatAudiovisual");
            console.log(this.selectedatAudiovisual);
            let formData = this.registrationForm.value; let File = "File";
            console.log(this.listOfFiles);
            //this.meetingRequestWebService.postMeetingRequest(this.registrationForm.value);
        }
        console.log(JSON.stringify(this.registrationForm.value));

    }
    isObjectEmpty(value) {
        return (
            Object.prototype.toString.call(value) === '[object Object]' &&
            JSON.stringify(value) === '{}'
        );
    }

    getCheckBoxes() {
        return [
            {
                name: "Meeting",
                disabled: false,
                checked: false

            }, {
                name: "JavaScript/jQuery",
                disabled: false,
                checked: false
            },
        ]
    };

    getOrders() {
        return [
            { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
        ]
    };

    getAttendeeOrders() {
        return [
            { id: 2, name: 'N/A' },
            { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
        ]
    };


    getMeetingLocations() {
        return [
            { id: 'NADA HQ Tysons', name: 'NADA HQ Tysons' },
            { id: 'NADA CHOB', name: 'NADA CHOB' },
            { id: 'Offsite', name: 'Offsite' }
        ]
    };
    getatNADALocation() {
        return [
            { id: 'Tysons Office', name: 'Tysons Office' },
            { id: 'DC Office', name: 'DC Office' }
        ]
    };

    getServicesNeeded() {
        return [
            { id: 'Hotel Rooms', name: 'Hotel Rooms' },
            { id: 'In-Office Catering Only', name: 'In-Office Catering Only' },
            { id: 'Hotel Room & Catering', name: 'Hotel Room & Catering' }
        ]
    };

    getHotelReservations() {
        return [
            { id: 'Ritz Tyson’s', name: 'Ritz Tyson’s' },
            { id: 'Hyatt Regency Tysons', name: 'Hyatt Regency Tysons' },
            { id: 'Hilton Tysons', name: 'Hilton Tysons' },
            { id: "Courtyard Tysons McLean", name: 'Courtyard Tysons McLean' },
            { id: 'JW Marriott DC', name: 'JW Marriott DC' },
            { id: 'Hilton DC', name: 'Hilton DC' },
            { id: 'Other', name: 'Other' }
        ]
    };

    getTypeOfHotel() {
        return [
            { id: 'Downtown', name: 'Downtown' },
            { id: 'Airport', name: 'Airport' },
            { id: 'Resort ', name: 'Resort' },
            { id: "Conference Center", name: 'Conference Center' }
        ]
    };
    ///OffSiteDiners  
    getRestaurantDesired() {
        return [
            { id: 'Quiet/Elegant', name: 'Quiet/Elegant' },
            { id: 'Fun/Casual', name: 'Fun/Casual' },
            { id: 'Other', name: 'Other' }
        ]
    };

    getTypeOfEvent() {
        return [
            { id: 'Working', name: 'Working' },
            { id: 'Presentation', name: 'Presentation' },
            { id: 'Networking', name: 'Networking' },
            { id: 'Hospitality', name: 'Hospitality' }

        ]
    };

    getMenuDesired() {
        return [
            { id: 'Pre-set', name: 'Pre-set' },
            { id: 'Order from menu', name: 'Order from menu  (limited depending on # of ppl)' }

        ]
    };


    getRequirementsOnDistance() {
        return [
            { id: 'Working', name: 'Working' },
            { id: 'Presentation', name: 'Presentation' },
            { id: 'Networking', name: 'Networking' },
            { id: 'Hospitality', name: 'Hospitality' }


        ]
    };

    getOffisteDistanceFromHotel() {
        return [
            { id: 'Walk', name: 'Walk' },
            { id: 'Short cab', name: 'Short cab' }


        ]
    };

    getFunctionType() {
        return [
            {
                id: 'Breakfast', name: 'Breakfast', disabled: false,
                checked: false
            },
            {
                id: 'Meeting', name: 'Meeting', disabled: false,
                checked: false
            },
            {
                id: 'Lunch', name: 'Lunch', disabled: false,
                checked: false
            },
            {
                id: 'Dinner', name: 'Dinner', disabled: false,
                checked: false
            },
            {
                id: 'Reception', name: 'Reception', disabled: false,
                checked: false
            },
            {
                id: 'Other', name: 'Other', disabled: false,
                checked: false
            }


        ]
    };

    getSetupRequirements() {
        return [
            { id: 'Conference (Boardroom style)', name: 'Conference (Boardroom style)' },
            { id: 'Hollow-square', name: 'Hollow-square' },
            { id: 'U-shape', name: 'U-shape' },
            { id: 'Theater', name: 'Theater' },
            { id: 'Schoolroom', name: 'Schoolroom' },
            { id: 'Rounds', name: 'Rounds' },
            { id: 'Reception', name: 'Reception' }

        ]
    };

    getEquipmentData() {
        return [
            { id: 'LCD projector and screen', name: 'LCD projector and screen' },
            { id: 'Computer (to run presentation)', name: 'Computer (to run presentation)' },
            { id: 'Podium with microphone', name: 'Podium with microphone' },
            { id: 'Table microphones', name: 'Table microphones' },
            { id: 'Lavaliere microphones', name: 'Lavaliere microphones' },
            { id: 'Power strips', name: 'Power strips' },
            { id: 'Conference phone', name: 'Conference phone' },
            { id: 'Clicker/Laser Pointer', name: 'Clicker/Laser Pointer' },
            { id: 'Flipcharts w/ markers', name: 'Flipcharts w/ markers' },
            { id: 'Clicker/Laser Pointer', name: 'Clicker/Laser Pointer' },
            { id: 'Post-it Type', name: 'Post-it Type' },
            { id: 'Other', name: 'Other' }

        ]
    };

    getTranspotationIndividuals() {
        return [
            { id: 'Individual(s)', name: 'Individual(s)' },
            { id: 'Group', name: 'Group' },
            { id: 'Both', name: 'Both' }

        ]
    };

    getTranspotationLocationDetails() {
        return [
            { id: 'Hotel', name: 'Hotel' },
            { id: 'Airport', name: 'Airport' },
            { id: 'Restaurant', name: 'Restaurant' },
            { id: 'Other', name: 'Other' }

        ]
    };

    //#region Events 
    radioChange(event: MatRadioChange) {
        console.log(event);
        console.log(event.value);
        console.log(event.source);
        this.servicesNeeded = false;
        this.selectedservicesNeededByUser = "";
        this.selectedservicesNeeded = "Services Needed";

        //localStorage.setItem(this.Meeting_location, event.value);
        var selectedLoc = event.value;
        if (selectedLoc.includes('NADA')) {
            this.servicesNeeded = true;
            this.selectedservicesNeeded = "";
            this.selectedservicesNeededByUser = "";
            console.log(' there' + selectedLoc);
            this.filterservicesNeededSelectNone(selectedLoc);
        }
        else {
            this.servicesNeeded = false;
            this.selectedservicesNeededByUser = "Offsite";
            console.log('not there ' + selectedLoc);
        }

    }
    radioMeetingAtNADA(event: MatRadioChange) {
        console.log(event);
        console.log(event.value);
        console.log(event.source);
        //localStorage.setItem(this.Meeting_location, event.value);
        var selectedLoc = event.value;

        if (selectedLoc == '1') {
            this.MeetingSpaceatNADALocation = true;

            console.log(' there' + selectedLoc);
        }
        else {
            this.MeetingSpaceatNADALocation = false;
            console.log('not there ' + selectedLoc);
        }

    }

    radioTransportationRequired(event: MatRadioChange) {

        var selectedLoc = event.value;

        if (selectedLoc == '1') {
            this.TransportationRequired = true;

        }
        else {
            this.TransportationRequired = false;
        }

    }

    radioTransportationDetails(event: MatRadioChange) {

        var selectedLoc = event.value;
        console.log(selectedLoc);
        if (!selectedLoc.includes('Group')) {
            this.TransportationIndivdualType = true;

        }
        else {
            this.TransportationIndivdualType = false;
        }

    }


    filterservicesNeeded(filterVal: any) {

        this.selectedservicesNeededByUser = filterVal.value;
        console.log(this.selectedservicesNeeded + "----filterservicesNeeded----" + filterVal.value);

    }
    filterservicesNeededSelectNone(data) {
        try {
            //myForm.get('addresses')['controls']
            this.registrationForm.controls.MeetingRequestData.get('selectedservicesNeededByUser').patchValue("");
            this.registrationForm.controls.MeetingRequestData.get('selectedservicesNeeded').patchValue("");

            console.log(this.selectedservicesNeededByUser + "----filterservicesNeeded----" + this.selectedservicesNeeded);
        }
        catch (error) {

        }


    }

    filterHotels(filterVal: any) {

        if (filterVal.value == "Other") {
            this.selectedOtherHotel = true;
            this.selectedHotelReservations = null;
            //  console.log(   this.registrationForm.controls.HotelReservations.controls.selectedHotelReservations);
            // console.log(   this.registrationForm.controls.HotelReservations.value.selectedHotelReservations);
            //this.registrationForm.controls.HotelReservations.controls.selectedHotelReservations.patchValue("");
            this.registrationForm.controls.HotelReservations.get('selectedHotelReservations').patchValue("");
            //  this.registrationForm.controls.HotelReservations.value
            //  console.log(   this.registrationForm.controls.HotelReservations.value.selectedHotelReservations);
        }
        // this.forecasts = this.cacheForecasts;
        else {
            this.selectedOtherHotel = false;
            console.log(filterVal);
        }
        //this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
    }


    filterRestaurants(filterVal: any) {

        console.log(filterVal.value);
        if (filterVal.value == "Other") {
            this.selectedRestaurantDesiredOther = true;
        }
        // this.forecasts = this.cacheForecasts;
        else {
            this.selectedRestaurantDesiredOther = false;
            console.log(filterVal);
        }
        //this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
    }

    filterEventType(filterVal: any) {

        console.log(filterVal.value);
        if (filterVal.value == "Other") {
            this.selectedEventTypeOther = true;
        }
        // this.forecasts = this.cacheForecasts;
        else {
            this.selectedEventTypeOther = false;
            console.log(filterVal);
        }
        //this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
    }

    //#endregion
    //checkboxes
    private mapToCheckboxArrayGroup(data: string[]): FormArray {
        return this.fb.array(data.map((i) => {
            return this.fb.group({
                name: i,
                selected: false
            });
        }));
    }
    private addCheckboxes() {
        try {

            this.FunctionTypeList.forEach((o, i) => {
                const control = new FormControl(i === 0); // if first item set to true, else false
                (this.registrationForm.controls.FunctionTypeData as FormArray).push(control);
            });

            this.SetUpRequirementsData.forEach((o, i) => {
                const control = new FormControl(i === 0); // if first item set to true, else false
                (this.registrationForm.controls.SetUpRequirementsData as FormArray).push(control);
            });

            this.EquipmentData.forEach((o, i) => {
                const control = new FormControl(i === 0); // if first item set to true, else false
                (this.registrationForm.controls.EquipmentData as FormArray).push(control);
            });

        } catch (error) {
            console.log(error);
        }
    }

    onChangeFunctionTypeList(event, index, item) {

        item.checked = !item.checked;

        this.CheckBoxProd = 'index: ' + index + ', label: ' + item.label + ', checked: ' + item.checked;

        console.log(index, event, item);
        if (item.checked) {
            this.FunctionTypeList.push(item.name);
            this.slectedCheckBoxes.push(item.name);
        }
        else {
            const index: number = this.slectedCheckBoxes.indexOf(item.name);
            if (index !== -1) {
                this.slectedCheckBoxes.splice(index, 1);
            }
        }

        let data = this.slectedCheckBoxes.includes('Other');
        console.log(this.slectedCheckBoxes.includes('Other') + "" + data);
        if (data) {
            console.log("erere");
            this.FunctionTypeOther = true;
        }
        else {
            console.log("Not here ");
            this.FunctionTypeOther = false;
        }


        console.log(this.slectedCheckBoxes);



    }

    onChangegetSetupRequirements(event, index, item) {

        item.checked = !item.checked;

        if (item.checked) {
            this.SetUpRequirementsslectedCheckBoxes.push(item.name);
        }


    }

    onChangeEquipment(event, index, item) {

        item.checked = !item.checked;

        if (item.checked) {
            this.SelectedEquipmentData.push(item.name);
        }


    }

    public onCancel = () => {
        this.location.back();
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.registrationForm.controls[controlName].hasError(errorName);
    }
    //checboxex
    /// add delete 
    onAddRow() {
        this.HotelRoomReqiurements.push(this.createItemFormGroup());
    }

    onRemoveRow(rowIndex: number) {
        this.HotelRoomReqiurements.removeAt(rowIndex);
    }

    onAddRowFoodandBeverage() {
        this.FoodandBeverageReqiurements.push(this.createItemFormGroup());
    }
    onRemoveFoodandBeverageRow(rowIndex: number) {
        this.FoodandBeverageReqiurements.removeAt(rowIndex);
    }

    onAddRowOffsiteDinersSpecial() {
        this.OffsiteDinersSpecialReqiurements.push(this.createItemFormGroup());
    }

    onRemoveOffsiteDinersSpecialRow(rowIndex: number) {
        this.OffsiteDinersSpecialReqiurements.removeAt(rowIndex);
    }


    onAddRowMeetingRoom() {
        this.MeetingRoomSpecialReqiurements.push(this.createItemFormGroup());
    }

    onRemoveRowMeetingRoomRow(rowIndex: number) {
        this.MeetingRoomSpecialReqiurements.removeAt(rowIndex);
    }


    createItemFormGroup(): FormGroup {


        return this.fb.group({
            Day: null,
            Date: null,
            RoomsNeeded: null,
            NumberOfAttendees: null
        });
    }
    /////dd delete
}