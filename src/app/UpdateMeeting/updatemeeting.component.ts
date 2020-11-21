import { Component } from '@angular/core'
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router'
import { MeetingRequestWebService } from '../webservice/meetingrequset.webservice';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatRadioChange } from '@angular/material';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog/confirm-dialog.component';
@Component({
    selector: 'updatemeeting',
    templateUrl: './updatemeeting.component.html',

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
export class UpdateMeetingComponent {
    data: Observable<Object>;
    Object = Object;
    routeName: String;
    list = [];
    data2 = [];

    dataload: any = [];
    roomRequirementsload: any = [];
    foodBevarageRequirementsload: any = [];
    speicalRequirementsload: any = [];
    meetingRoomRequirementsload: any = [];

    registrationForm: FormGroup;
    fields: any;
    fields1: any;
    fields2: any;
    fields3: any;

    hotelRoomReqiurements: FormArray;
    foodandBeverageReqiurements: FormArray;
    offsiteDinersSpecialReqiurements: FormArray;
    meetingRoomSpecialReqiurements: FormArray;

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
    selectedservicesNeededByUser: String;
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
    functionTypeList = [];
    functionTypeData = [];
    slectedCheckBoxes = [];
    functionTypeOther: boolean;
    SelectedFunctionTypeOther: String;
    listOfFiles = [];
    meetingFile: any; AgendaFile: {};
    setUpRequirementsData = [];
    SetUpRequirementsslectedCheckBoxes = [];

    selectedEquipmentData = [];
    equipmentData = [];


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
    updatedBy: String;
    agendaFileView: any; meetingFileView: any;

    constructor(private fb: FormBuilder,
        private meetingRequestWebService: MeetingRequestWebService,
        private webService: WebService, private route: ActivatedRoute,
        public dialog: MatDialog,
        private auth: AuthService, private location: Location) {
        this.hotelRoomReqiurements = this.fb.array([]);
        this.foodandBeverageReqiurements = this.fb.array([]);
        this.offsiteDinersSpecialReqiurements = this.fb.array([]);
        this.meetingRoomSpecialReqiurements = this.fb.array([]);
    }

    ngOnInit() {
        this.registrationForm = this.fb.group({
            meetingRequestData: new FormGroup({
                nameOfMeeting: new FormControl(null, Validators.required),
                staffContact: new FormControl(null, Validators.required),
                meetingDates: new FormControl(null, Validators.required),
                attendance: new FormControl(null, Validators.required),
                //MeetingAgenda: new FormControl(null, Validators.required),
                meetingAgendaDate: new FormControl(new Date()),
                attendeeList: new FormControl(''),
                attendeeListDate: new FormControl(new Date()),
                meetingLocations: new FormControl(''),
                selectedMeetingLocations: new FormControl(''),
                selectedAgenda: new FormControl(''),
                selectedAttendeeList: new FormControl(''),
                servicesNeeded: new FormControl(''),
                servicesNeededList: new FormControl(''),
                selectedservicesNeededByUser: new FormControl(''),
                selectedservicesNeeded: new FormControl(''),

            }),
            hotelReservations: new FormGroup({
                selectedHotelReservations: new FormControl(''),
                hotelReservationList: new FormControl(''),
                servicesNeededList: new FormControl(''),
                typeOfHotelList: new FormControl(''),
                selectedTypeOfHotel: new FormControl(''),
                budgetforHotelrooms: new FormControl(''),
            }),
            foodBeverage: new FormGroup({
                foodFunctions: new FormControl(''),
                selectedFoodFunctions: new FormControl(Number),
                separateRoomForMeals: new FormControl(''),
                selectedSeparateRoomForMeals: new FormControl(Number),
                budgetforFoodandBeverage: new FormControl(Number),
            }),
            offSiteDinersData: new FormGroup({
                offSiteDiners: new FormControl(''),
                selectedOffsiteDiners: new FormControl(Number),
                offsiteDinerPrefferedRestaurant: new FormControl(''),
                offisteDinerPrivateRoom: new FormControl(''),
                selectedOffisteDinerPrivateRoom: new FormControl(Number),
                offisteDinerSectionedOffArea: new FormControl(''),
                selectedOffisteDinerSectionedOffArea: new FormControl(Number),
                restaurantDesiredList: new FormControl(''),
                selectedRestaurantDesired: new FormControl(''),

                selectedMenuDesired: new FormControl(''),

                selectedEventType: new FormControl(''),
                offisteDistanceFromHotel: new FormControl(''),
                selectedffisteDistanceFromHotel: new FormControl(''),
                otherOffSiteDiner: new FormControl(''),

            }),
            meetingSpace: new FormGroup({
                meetingSpaceHotel: new FormControl(''),
                selectedMeetingSpaceHotel: new FormControl(Number),
                meetingSpaceHotelNADA: new FormControl(Number),
                selectedMeetingSpaceHotelNADA: new FormControl(Number),

                atNADALocation: new FormControl(''),
                selectedatNADALocation: new FormControl(''),
                selectedFunctionFunctionTypeListType: new FormControl(''),
                functionTypeData: this.mapToCheckboxArrayGroup(this.functionTypeData),
                functionTypeList: new FormControl(''),

                selectedFunctionTypeOther: new FormControl(''),
                setUpRequirementsData: new FormControl(''),

                audiovisual: new FormControl(''),
                selectedatAudiovisual: new FormControl(Number),

                selectedEquipmentData: new FormControl(''),
                equipmentData: new FormControl(''),
                budgetforAudioVisual: new FormControl(''),
            }),
            transpotation: new FormGroup({

                selectedatTransportation: new FormControl(Number),
                selectedatTransportationType: new FormControl(''),
                selectedTransportationListProvided: new FormControl(Number),
                transportationDropoffLocation: new FormControl(''),
                selectedTransportationDropoffLocation: new FormControl(''),
                transportationPickUpLocation: new FormControl(''),
                selectedTransportationPickUpLocation: new FormControl(''),
            }),
            signage: new FormGroup({
                selectedSinage: new FormControl(Number),
            }),
            misc: new FormGroup({

                selectedMiscBadges: new FormControl(Number),
                selectedMiscTenentCards: new FormControl(Number),
                otherComments: new FormControl(''),
            }),
            hotelRoomReqiurements: this.fb.array([]),
            foodandBeverageReqiurements: this.fb.array([]),
            offsiteDinersSpecialReqiurements: this.fb.array([]),
            meetingRoomSpecialReqiurements: this.fb.array([]),
            completed: new FormControl(''),
            meetingId: new FormControl(Number),
            updatedBy: new FormControl(''),
            id: new FormControl(''),
        });
        // this.registrationForm.addControl('hotelRoomReqiurements', this.hotelRoomReqiurements);

        /*   Object.keys(employees).map(function(key){
            arr.push({[key]:employees[key]})
            return arr;
        }); */


        /////////////////////////PreloadForm
        var name = this.route.snapshot.params.name;

        this.meetingRequestWebService.getUser();
        //console.log( this.meetingRequestWebService.getMeetingRequest(name) );
        console.log(name);
        this.routeName = name;
        if (name != null) {  //this.data.patchValue(this.meetingRequestWebService.getMeetingRequest(name));
            this.data = this.meetingRequestWebService.loadData(name);

            console.log(JSON.stringify(this.data));
            //   sessionStorage.setItem('meetingGuid', JSON.stringify());
            this.registrationForm.valueChanges.subscribe(form => {
                sessionStorage.setItem('form', JSON.stringify(form));
            });
            sessionStorage.setItem('form', JSON.stringify(this.data));
            let formValues = sessionStorage.getItem('form');
            if (formValues != null) {
                // if (data && data.files) {
                //     this.agendaFileView = data.files.find(x => x.isAgendaFile == true);
                //     this.meetingFileView = data.files.find(x => x.isAgendaFile == false);
                //   }
                debugger
                this.agendaFileView = JSON.parse('{"fileName":"A-9~free_screen_recorder-21-11-2020 12.56.51 PM-362.zip","extension":null,"fileBytes":"https://dealeropsstorage.blob.core.windows.net/meetingslive/A-9~free_screen_recorder-21-11-2020%2012.56.51%20PM-362.zip","contentType":null,"isAgendaFile":true}');
                var dataToload = JSON.parse(formValues);
                this.fields = (dataToload.hotelRoomReqiurements);
                const control = <FormArray>this.registrationForm.get('hotelRoomReqiurements');
                const control2 = <FormArray>this.registrationForm.get('foodandBeverageReqiurements');
                const control3 = <FormArray>this.registrationForm.get('offsiteDinersSpecialReqiurements');
                const control4 = <FormArray>this.registrationForm.get('meetingRoomSpecialReqiurements');

                console.log(this.fields);
                Object.keys(this.fields).forEach(key => {
                    var dayy = this.fields[key].Day.replace('"', '');
                    console.log("dayysadsadasdsad");
                    console.log(dayy);
                    control.push(this.patchValues(dayy,
                        this.fields[key].Date.replace('"', ''),
                        this.fields[key].RoomsNeeded,
                        this.fields[key].NumberOfAttendees));
                });




                this.fields.forEach(element => {
                    this.roomRequirementsload.push({ Day: element.Day, Date: element.Date, RoomsNeeded: element.RoomsNeeded, NumberOfAttendees: element.NumberOfAttendees });

                });

                console.log(this.roomRequirementsload);
                this.fields2 = (dataToload.foodandBeverageReqiurements);
                console.log(this.fields2);
                Object.keys(this.fields2).forEach(key => {
                    control2.push(this.patchValues(this.fields2[key].Day.replace('"', ''),
                        this.fields2[key].Date.replace('"', ''),
                        this.fields2[key].RoomsNeeded,
                        this.fields2[key].NumberOfAttendees));
                });

                this.fields2.forEach(element => {
                    this.foodBevarageRequirementsload.push({ Day: element.Day, Date: element.Date, RoomsNeeded: element.RoomsNeeded, NumberOfAttendees: element.NumberOfAttendees });

                });

                this.fields3 = (dataToload.offsiteDinersSpecialReqiurements);
                console.log(this.fields3);
                Object.keys(this.fields3).forEach(key => {
                    control3.push(this.patchValues(this.fields3[key].Day.replace('"', ''),
                        this.fields3[key].Date.replace('"', ''),
                        this.fields3[key].RoomsNeeded,
                        this.fields3[key].NumberOfAttendees));
                });

                this.fields3.forEach(element => {
                    this.speicalRequirementsload.push({ Day: element.Day, Date: element.Date, RoomsNeeded: element.RoomsNeeded, NumberOfAttendees: element.NumberOfAttendees });

                });

                this.fields1 = (dataToload.meetingRoomSpecialReqiurements);
                console.log(this.fields1);
                Object.keys(this.fields1).forEach(key => {
                    control4.push(this.patchValues(this.fields1[key].Day.replace('"', ''),
                        this.fields1[key].Date.replace('"', ''),
                        this.fields1[key].RoomsNeeded,
                        this.fields1[key].NumberOfAttendees));
                });
                this.fields1.forEach(element => {
                    this.meetingRoomRequirementsload.push({ Day: element.Day, Date: element.Date, RoomsNeeded: element.RoomsNeeded, NumberOfAttendees: element.NumberOfAttendees });

                });
                // this.hotelRoomReqiurements.patchValues(this.fields );
                //control.push(this.patchValues(this.fields ,this.fields ))
                /*
                 console.log(control );
                 this.fields.type.forEach(x => {
                    control.push(this.patchValues(x.Day, x.Date))
                  })
                this.hotelRoomReqiurements.push(this.createItemFormGroup());*/
                //////////////////////
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

                of(this.getFunctionType(dataToload.meetingSpace.functionTypeList)).subscribe(locations => {
                    this.functionTypeData = locations;
                    this.addCheckboxes();
                });
                of(this.getatNADALocation()).subscribe(locations => {
                    this.atNADALocation = locations;
                });

                of(this.getSetupRequirements(dataToload.meetingSpace.setUpRequirementsData)).subscribe(locations => {
                    this.setUpRequirementsData = locations;
                    this.addCheckboxes();
                });
                of(this.getEquipmentData(dataToload.meetingSpace.equipmentData)).subscribe(locations => {
                    this.equipmentData = locations;
                    this.addCheckboxes();
                });

                of(this.getTranspotationIndividuals()).subscribe(locations => {
                    this.TransportationType = locations;
                });

                of(this.getTranspotationLocationDetails()).subscribe(locations => {
                    this.TransportationPickUpLocation = locations;

                    this.TransportationDropoffLocation = locations;


                });

                ///////////////////////
                console.log(this.auth.name);

                this.updatedBy = this.auth.name;
            }

            this.registrationForm.patchValue(this.meetingRequestWebService.getMeetingRequest(name));
            // this.data =  this.meetingRequestWebService.loadData(name).pipe(
            // tap(user => console.log(user))




            if (formValues) {
                var dataToload = JSON.parse(formValues);
                dataToload.updatedBy = this.auth.name;
                this.applyFormValues(this.registrationForm, dataToload);
                /// updatecheckboxes
                console.log(dataToload.meetingSpace.functionTypeList);
                this.updatecheckboxes(dataToload.meetingSpace.functionTypeList)
            }
        }
        ///////////////////////          

    }


    handelMeetingFileInput(event) {
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
                    if (this.listOfFiles.length > 0) {
                        let index = this.listOfFiles.findIndex(x => x.IsAgendaFile == false);
                        if (index != -1) {

                            this.listOfFiles.splice(index, 1);
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

                    if (this.listOfFiles.length > 0) {
                        let index = this.listOfFiles.findIndex(x => x.IsAgendaFile == true);
                        if (index != -1) {

                            this.listOfFiles.splice(index, 1);
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

    private updatecheckboxes(data: string[]) {
        console.log(data);
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
                try {
                    formControl.setValue(formValues[key]);
                }
                catch (error) {
                    // console.log(error);
                }
                //f
            }
        });
    }

    removeFile(name) {
        debugger
        console.log('name', name);
        this.removeFileConfirm(name)
        // this.http.get('https://localhost:44369/' + 'api/weatherforecast/delete/' + name).subscribe((data: any) => {
        //   console.log('data', data);
        //   this.findMeeting1(2);
        // })
    }
    removeFileConfirm(fileName: string) {
        let input: any = { "mode": null, "message": "" };
        input.mode = "DELETE";
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '40%',
            data: input
        });
        dialogRef.afterClosed().subscribe(action => {
            if (action.mode === "DELETE") {
                alert('deleted')
            }
        })
    }

    downloadDataUrlFromJavascript(filename, dataUrl) {
        debugger
        console.log('name', filename);
        console.log('url', dataUrl);
        document.location.href = dataUrl;

        //this.http.get('https://localhost:44369/' + 'api/weatherforecast/downloadfile/' + filename).subscribe((data: any) => {
        //  console.log('data', data);
        //  console.log(data);
        //  if (data != null) {
        //    const downloadedFile = new Blob([data.base64Data], { type: data.contentType });
        //    const a = document.createElement('a');
        //    a.setAttribute('style', 'display:none;');
        //    document.body.appendChild(a);
        //    a.download = name;
        //    a.href = URL.createObjectURL(downloadedFile);
        //    a.target = '_blank';
        //    a.click();
        //    document.body.removeChild(a);
        //  } 
        //})

    }

    /*handleNumberChange(val) {
            //Try to Remove Control for higher number if any.
            const val_plus_one = parseInt(val) + 1
            try {
                this.registrationForm.removeControl(val_plus_one.toString())
            } catch { }
            //Add formControls for 1 - number of books that user enters.
            const numbers = Array(val_numfill().map((_, idx) => idx + 1)
            numbers.forEach((num) => {
                const fc = new FormControl('');
                this.registrationForm.addControl(num.toString(), fc)
            })
            this.number_of_books = numbers;
        }*/

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

    getFunctionType(functiontype) {
        console.log(functiontype.toString());
        var data = [
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


        ];
        var i
        for (i = 0; i < data.length; i++) {
            try {
                if (functiontype.toString().includes(data[i].id.toString())) {
                    data[i].checked = true;
                    this.slectedCheckBoxes.push(data[i].id);

                }
            }
            catch (error) {
                console.log(error);
            }

        }
        return data;
    };

    getSetupRequirements(functiontype) {
        var data = [
            {
                id: 'Conference (Boardroom style)', name: 'Conference (Boardroom style)',
                checked: false
            },
            {
                id: 'Hollow-square', name: 'Hollow-square',
                checked: false
            },
            {
                id: 'U-shape', name: 'U-shape',
                checked: false
            },
            {
                id: 'Theater', name: 'Theater',
                checked: false
            },
            {
                id: 'Schoolroom', name: 'Schoolroom',
                checked: false
            },
            {
                id: 'Rounds', name: 'Rounds',
                checked: false
            },
            {
                id: 'Reception', name: 'Reception',
                checked: false
            }

        ];
        var i
        for (i = 0; i < data.length; i++) {
            try {
                if (functiontype.toString().includes(data[i].id.toString())) {
                    data[i].checked = true;
                    this.SetUpRequirementsslectedCheckBoxes.push(data[i].id);

                }
            }
            catch (error) {
                console.log(error);
            }

        }
        return data;
    };

    getEquipmentData(functiontype) {
        var data = [
            {
                id: 'LCD projector and screen', name: 'LCD projector and screen',
                checked: false
            },
            {
                id: 'Computer (to run presentation)', name: 'Computer (to run presentation)',
                checked: false
            },
            {
                id: 'Podium with microphone', name: 'Podium with microphone',
                checked: false
            },
            {
                id: 'Table microphones', name: 'Table microphones',
                checked: false
            },
            {
                id: 'Lavaliere microphones', name: 'Lavaliere microphones',
                checked: false
            },
            {
                id: 'Power strips', name: 'Power strips',
                checked: false
            },
            {
                id: 'Conference phone', name: 'Conference phone',
                checked: false
            },
            {
                id: 'Clicker/Laser Pointer', name: 'Clicker/Laser Pointer',
                checked: false
            },
            {
                id: 'Flipcharts w/ markers', name: 'Flipcharts w/ markers',
                checked: false
            },
            {
                id: 'Clicker/Laser Pointer', name: 'Clicker/Laser Pointer',
                checked: false
            },
            {
                id: 'Post-it Type', name: 'Post-it Type',
                checked: false
            },
            {
                id: 'Other', name: 'Other',
                checked: false
            }

        ];
        var i
        for (i = 0; i < data.length; i++) {
            try {
                if (functiontype.toString().includes(data[i].id.toString())) {
                    data[i].checked = true;
                    this.selectedEquipmentData.push(data[i].id);

                }
            }
            catch (error) {
                console.log(error);
            }

        }
        return data;
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
        //localStorage.setItem(this.Meeting_location, event.value);
        var selectedLoc = event.value;
        if (selectedLoc.includes('NADA')) {
            this.servicesNeeded = true;

            console.log(' there' + selectedLoc);
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

    filterHotels(filterVal: any) {

        if (filterVal.value == "Other") {
            this.selectedOtherHotel = true;
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
            var isSelected = false;
            if (this.functionTypeList.includes(i)) {
                isSelected = true;
            }
            console.log("cheked item" + i + "--" + isSelected);
            var itemslist = this.fb.group({
                name: i,
                selected: isSelected
            });

            return itemslist;
        }));
    }
    private addCheckboxes() {
        try {

            this.functionTypeList.forEach((o, i) => {
                const control = new FormControl(i === 0); // if first item set to true, else false
                (this.registrationForm.controls.functionTypeData as FormArray).push(control);
            });

            this.setUpRequirementsData.forEach((o, i) => {
                const control = new FormControl(i === 0); // if first item set to true, else false
                (this.registrationForm.controls.setUpRequirementsData as FormArray).push(control);
            });

            this.equipmentData.forEach((o, i) => {
                const control = new FormControl(i === 0); // if first item set to true, else false
                (this.registrationForm.controls.equipmentData as FormArray).push(control);
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
            this.functionTypeList.push(item.name);
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
            this.functionTypeOther = true;
        }
        else {
            console.log("Not here ");
            this.functionTypeOther = false;
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
            this.selectedEquipmentData.push(item.name);
        }


    }

    public hasError = (controlName: string, errorName: string) => {
        return this.registrationForm.controls[controlName].hasError(errorName);
    }
    //checboxex
    /// add delete 
    onAddRow() {
        this.hotelRoomReqiurements.push(this.createItemFormGroup());
    }

    onRemoveRow(rowIndex: number) {
        this.hotelRoomReqiurements.removeAt(rowIndex);
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

    patchValues(Day, Date, RoomsNeeded, NumberOfAttendees) {
        return this.fb.group({

            Day: [Day],
            Date: [Date],
            RoomsNeeded: [RoomsNeeded],
            NumberOfAttendees: [NumberOfAttendees]
        })
    }

    public SaveChanges = (registrationForm) => {

        this.registrationForm.controls.meetingSpace.value.functionTypeList = this.slectedCheckBoxes;
        this.registrationForm.controls.meetingSpace.value.setUpRequirementsData = this.SetUpRequirementsslectedCheckBoxes;
        this.registrationForm.controls.meetingSpace.value.equipmentData = this.selectedEquipmentData;

        console.log(this.registrationForm.controls.hotelRoomReqiurements);

        ///////




        if (this.registrationForm.valid) {
            console.log(this.registrationForm.value);
            console.log("here");
            //check if all int's are not null 
            if (!this.selectedatAudiovisual) {
                console.log("empty -->selectedatAudiovisual");

            }
            console.log("selectedatAudiovisual");
            console.log();

            this.meetingRequestWebService.putMeetingRequest(this.registrationForm.controls.id.value, this.registrationForm.value)
            //();
        }
        console.log(JSON.stringify(this.registrationForm.value));

    }

    public onCancel = () => {
        this.location.back();
    }

    /////dd delete
}
