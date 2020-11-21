import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator';
import { MatRadioChange } from '@angular/material';
import { MeetingRequestWebService } from '../webservice/meetingrequset.webservice';
import { of } from 'rxjs';
@Component({
  selector: 'meetingstepper',
  templateUrl: './meetingstepper.component.html',
})
export class MeetingStepperComponent implements OnInit {
  title = '';
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
  registrationForm: FormGroup;
  constructor(private meetingRequestWebService: MeetingRequestWebService,
     private location: Location, private auth: AuthService, private fb: FormBuilder) {
    this.RoomReqiurements = this.fb.array([]);
    this.FoodandBeverageReqiurements = this.fb.array([]);
    this.OffsiteDinersSpecialReqiurements = this.fb.array([]);
    this.MeetingRoomSpecialReqiurements = this.fb.array([]);
  }
  ngOnInit(): void {
    this.registrationForm =  this.fb.group({
      personalDetails: new FormGroup({
        NameOfMeeting: new FormControl(null, Validators.required),
        StaffContact: new FormControl(null, Validators.required),
        'MeetingDates': new FormControl(null, Validators.required),
        'Attendance': new FormControl(null, Validators.required),
       
        'MeetingAgendaDate': new FormControl(new Date()),
        'AttendeeList': new FormControl(null),
        'AttendeeListDate': new FormControl(null),
        selectedAnswers: new FormControl(null),
        selectedAgenda: new FormControl(null),
        selectedAttendeeList: new FormControl(null),
        selectedMeetingLocations: new FormControl(null),
        selectedservicesNeeded: new FormControl(null),
      }), MeetingAgenda: new FormControl(null),
      contactDetails: new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl(null)
      }),
      misc: new FormGroup({
        selectedHotelReservations: new FormControl(null),
        HotelReservationList: new FormControl(null),
        servicesNeededList: new FormControl(null),
        TypeOfHotelList: new FormControl(null),
        selectedTypeOfHotel: new FormControl(null),
        //items: [null, Validators.required],
        //items_value: ['no', Validators.required],
        BudgetforHotelrooms: new FormControl(null),
        FoodFunctions: new FormControl(null),
        selectedFoodFunctions: new FormControl(null),
        SeparateRoomForMeals: new FormControl(null),
        selectedSeparateRoomForMeals: new FormControl(null),
        BudgetforFoodandBeverage: new FormControl(null),
        OffSiteDiners: new FormControl(null),
        selectedOffsiteDiners: new FormControl(null),
        OffsiteDinerPrefferedRestaurant: new FormControl(null),
        OffisteDinerPrivateRoom: new FormControl(null),
        selectedOffisteDinerPrivateRoom: new FormControl(null),
        OffisteDinerSectionedOffArea: new FormControl(null),
        selectedOffisteDinerSectionedOffArea: new FormControl(null),
        RestaurantDesiredList: new FormControl(null),
        selectedRestaurantDesired: new FormControl(null),
        MenuDesiredList: new FormControl(null),
        selectedMenuDesired: new FormControl(null),
        EventTypeList: new FormControl(null),
        selectedEventType: new FormControl(null),

        OffisteDistanceFromHotel: new FormControl(null),
        selectedffisteDistanceFromHotel: new FormControl(null),
        OtherOffSiteDiner: new FormControl(null),


        MeetingSpaceHotel: new FormControl(null),
        selectedMeetingSpaceHotel: new FormControl(null),
        MeetingSpaceHotelNADA: new FormControl(null),
        selectedMeetingSpaceHotelNADA: new FormControl(null),

        atNADALocation: new FormControl(null),
        selectedatNADALocation: new FormControl(null),
        // // Password:new FormControl(null), 
        // ConfirmPassword:new FormControl(null)
        selectedFunctionFunctionTypeListType: new FormControl(false),
        FunctionTypeData: this.mapToCheckboxArrayGroup(this.FunctionTypeData),
        FunctionTypeList: new FormArray([]),

        SelectedFunctionTypeOther: new FormControl(null),
        SetUpRequirementsData: new FormArray([]),

        Audiovisual: new FormControl(null),
        selectedatAudiovisual: new FormControl(null),

        SelectedEquipmentData: new FormControl(null),
        EquipmentData: new FormArray([]),
        BudgetforAudioVisual: new FormControl(null),

        Transportation: new FormControl(null),
        selectedatTransportation: new FormControl(null),

        TransportationType: new FormControl(null),
        selectedatTransportationType: new FormControl(null),

        TransportationListProvided: new FormControl(null),
        selectedTransportationListProvided: new FormControl(null),

        TransportationDropoffLocation: new FormControl(null),
        selectedTransportationDropoffLocation: new FormControl(null),

        TransportationPickUpLocation: new FormControl(null),
        selectedTransportationPickUpLocation: new FormControl(null),

        Sinage: new FormControl(null),
        selectedSinage: new FormControl(null),
        MiscBadges: new FormControl(null),
        selectedMiscBadges: new FormControl(null),
        MiscTenentCards: new FormControl(null),
        selectedMiscTenentCards: new FormControl(null),

        OtherComments: new FormControl(null),

      })
    });

    this.registrationForm.addControl('RoomReqiurements', this.RoomReqiurements);
    this.registrationForm.addControl('FoodandBeverageReqiurements', this.FoodandBeverageReqiurements);
    //OffsiteDinersSpecialReqiurements
    this.registrationForm.addControl('OffsiteDinersSpecialReqiurements', this.OffsiteDinersSpecialReqiurements);
    this.registrationForm.addControl('MeetingRoomSpecialReqiurements', this.MeetingRoomSpecialReqiurements);
/*
    of(this.getFunctionType()).subscribe(locations => {
      this.FunctionTypeData = locations;
      this.addCheckboxes();
    });

    of(this.getSetupRequirements()).subscribe(locations => {
      this.SetUpRequirementsData = locations;
      this.addCheckboxes();
    });
    of(this.getEquipmentData()).subscribe(locations => {
      this.EquipmentData = locations;
      this.addCheckboxes();
    });

*/

    of(this.getOrders()).subscribe(orders => {
      this.MeetingAgenda = orders;
      console.log(this.MeetingAgenda);
      //console.log(this.registrationForm.controls.personalDetails.controls.MeetingAgenda);
      console.log(this.registrationForm);
       this.registrationForm.controls.MeetingAgenda.patchValue(this.MeetingAgenda);

      this.AttendeeList = orders;
     // this.registrationForm.controls.AttendeeList.patchValue(this.AttendeeList[0].id);

     /* this.FoodFunctions = orders;
      this.registrationForm.controls.FoodFunctions.patchValue(this.FoodFunctions[0].id);

      this.SeparateRoomForMeals = orders;
      this.registrationForm.controls.SeparateRoomForMeals.patchValue(this.SeparateRoomForMeals[0].id);


      this.OffSiteDiners = orders;
      this.registrationForm.controls.OffSiteDiners.patchValue(this.OffSiteDiners[0].id);

      this.OffisteDinerPrivateRoom = orders;
      this.registrationForm.controls.OffisteDinerPrivateRoom.patchValue(this.OffisteDinerPrivateRoom[0].id);

      this.OffisteDinerSectionedOffArea = orders;
      this.registrationForm.controls.OffisteDinerSectionedOffArea.patchValue(this.OffisteDinerSectionedOffArea[0].id);

      this.MeetingSpaceHotel = orders;
      this.registrationForm.controls.MeetingSpaceHotel.patchValue(this.MeetingSpaceHotel[0].id);


      this.MeetingSpaceHotelNADA = orders;
      this.registrationForm.controls.MeetingSpaceHotelNADA.patchValue(this.MeetingSpaceHotelNADA[0].id);



      this.Audiovisual = orders;
      this.registrationForm.controls.Audiovisual.patchValue(this.Audiovisual[0].id);

      this.Transportation = orders;
      this.registrationForm.controls.Transportation.patchValue(this.Transportation[0].id);

      this.TransportationListProvided = orders;
      this.registrationForm.controls.TransportationListProvided.patchValue(this.TransportationListProvided[0].id);

      this.Sinage = orders;
      this.registrationForm.controls.Sinage.patchValue(this.Sinage[0].id);


      this.MiscBadges = orders;
      this.registrationForm.controls.MiscBadges.patchValue(this.MiscBadges[0].id);
      this.MiscTenentCards = orders;
      this.registrationForm.controls.MiscTenentCards.patchValue(this.MiscTenentCards[0].id);

*/



    });
   /* of(this.getMeetingLocations()).subscribe(locations => {
      this.MeetingLocations = locations;
      this.registrationForm.controls.MeetingLocations.patchValue(this.MeetingLocations[0].id);
    });

    of(this.getServicesNeeded()).subscribe(options => {
      this.servicesNeededList = options;
      this.registrationForm.controls.servicesNeededList.patchValue(this.servicesNeededList[0].id);
    });

    of(this.getHotelReservations()).subscribe(options => {
      this.HotelReservationList = options;
      this.registrationForm.controls.HotelReservationList.patchValue(this.HotelReservationList[0].id);

    });

    of(this.getTypeOfHotel()).subscribe(options => {
      this.TypeOfHotelList = options;
      this.registrationForm.controls.TypeOfHotelList.patchValue(this.TypeOfHotelList[0].id);

    });
    of(this.getRestaurantDesired()).subscribe(options => {
      this.RestaurantDesiredList = options;
      this.registrationForm.controls.RestaurantDesiredList.patchValue(this.RestaurantDesiredList[0].id);

    });

    //getMenuDesired getRequirementsOnDistance
    of(this.getMenuDesired()).subscribe(options => {
      this.MenuDesiredList = options;
      this.registrationForm.controls.MenuDesiredList.patchValue(this.MenuDesiredList[0].id);

    });
    of(this.getRequirementsOnDistance()).subscribe(options => {
      this.EventTypeList = options;
      this.registrationForm.controls.EventTypeList.patchValue(this.EventTypeList[0].id);

    });
    of(this.getOffisteDistanceFromHotel()).subscribe(options => {
      this.OffisteDistanceFromHotel = options;
      this.registrationForm.controls.OffisteDistanceFromHotel.patchValue(this.OffisteDistanceFromHotel[0].id);

    });

    of(this.getTranspotationIndividuals()).subscribe(locations => {
      this.TransportationType = locations;
      this.registrationForm.controls.TransportationType.patchValue(this.TransportationType[0].id);
    });


    of(this.getTranspotationLocationDetails()).subscribe(locations => {
      this.TransportationPickUpLocation = locations;
      this.registrationForm.controls.TransportationPickUpLocation.patchValue(this.TransportationPickUpLocation[0].id);

      this.TransportationDropoffLocation = locations;
      this.registrationForm.controls.TransportationDropoffLocation.patchValue(this.TransportationDropoffLocation[0].id);

    });
    /// NADA Location 
    of(this.getatNADALocation()).subscribe(locations => {
      this.atNADALocation = locations;
      this.registrationForm.controls.atNADALocation.patchValue(this.atNADALocation[0].id);
    });
    */
  }
  ///////////misc /////////////////////////////////////////////////////////////////////////////
  private mapToCheckboxArrayGroup(data: string[]): FormArray {
    return this.fb.array(data.map((i) => {
      return this.fb.group({
        name: i,
        selected: false
      });
    }));
  }
  /*
  private addCheckboxes() {
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


  }*/


  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }
  onAddRow() {
    this.RoomReqiurements.push(this.createItemFormGroup());
  }

  onAddRowFoodandBeverage() {
    this.FoodandBeverageReqiurements.push(this.createItemFormGroup());
  }

  onAddRowOffsiteDinersSpecial() {
    this.OffsiteDinersSpecialReqiurements.push(this.createItemFormGroup());
  }

  onAddRowMeetingRoom() {
    this.MeetingRoomSpecialReqiurements.push(this.createItemFormGroup());
  }

  createItemFormGroup(): FormGroup {


    return this.fb.group({
      Day: null,
      Date: null,
      RoomsNeeded: null,
      NumberOfAttendees: null
    });
  }
  list_change() {
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.FunctionTypeList)) {
      if (value.checked) {
        checked_count++;
        console.log(value.checked);
      }

    }

  }


  onRemoveRow(rowIndex: number) {
    this.RoomReqiurements.removeAt(rowIndex);
  }

  onRemoveFoodandBeverageRow(rowIndex: number) {
    this.FoodandBeverageReqiurements.removeAt(rowIndex);
  }
  onRemoveOffsiteDinersSpecialRow(rowIndex: number) {
    this.OffsiteDinersSpecialReqiurements.removeAt(rowIndex);
  }
  onRemoveRowMeetingRoomRow(rowIndex: number) {
    this.MeetingRoomSpecialReqiurements.removeAt(rowIndex);
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


  /////////misc /////////////////////


  /////////extras//////////////////////

  isValid(control) {
    return this.registrationForm.controls[control].invalid && this.registrationForm.controls[control].touched;
  }


  changeMeetingLocationsValue() {


    console.log(this.registrationForm.get('selectedMeetingLocations').value);
    console.log(this.registrationForm.value.selectedMeetingLocations);
  }

  //#region Validations and checks 
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
      console.log('not there ' + selectedLoc);
    }
  }
  radioChangeselectedServices(event: MatRadioChange) {
    console.log(event);
    console.log(event.value);
    console.log(event.source);
    //localStorage.setItem(this.Meeting_location, event.value);
    var selectedLoc = event.value;

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

  radioSignaneRequired(event: MatRadioChange) {

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

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
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

  onChange(event, index, item) {

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


  //#endregion
  public onCancel = () => {
    this.location.back();
  }
}

function mismatchingFields(field1, field2) {

  return form => {
    if (form.controls[field1].value !== form.controls[field2].value)
      return { mismatchingFields: true }
  }
}

function emailValid() {
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(control.value) ? null : { invalidEmail: true }
  }
}




