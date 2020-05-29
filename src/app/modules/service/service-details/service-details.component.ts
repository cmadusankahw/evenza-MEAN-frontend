import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Service, ServiceCategories, ServiceRates } from '../service.model';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';
import { EventPlannerService } from '../../eventplanner/eventplanner.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {


// subscription
  private serviceSub: Subscription ;
  private categorySub: Subscription ;
  private ratesSub: Subscription ;


  // service is editable by parent comp
  @Input() isowner = false;

  // editablity
  @Input() editable = true;

  // is logged as event planner and booking dates recieved
  @Input() islogged = true;
  @Input() dates: {fromDate: any, toDate: any};

  // book now mode
  bookUser = false;

  // make appointment
  appoint = false;

  // edit mode by parent comp
  editmode = false;

  // service removed
  removed = false;

  // booking default times time
  fromTime = {hour: 8, minute: 0};
  toTime = {hour: 18, minute: 0};

  // appointment default date and time
  today = new Date();
  appointment = {date: this.today, time: {hour: 8, minute: 0} };

  // total amount
  totalAmount = 0.0;
  payAmount = 0.0;


  // images to upload
  image01: File;
  image01Url: any = './assets/images/merchant/nopic.png';
  image02: File;
  image02Url: any = './assets/images/merchant/nopic.png';
  image03: File;
  image03Url: any = './assets/images/merchant/nopic.png';


  // recieved categories
  categories: ServiceCategories[] = [];

  // recieved quantities
  rates: ServiceRates[] = [];

  // recieved service (initial declaration)
  service: Service = {
        service_id: null,
        service_name: null,
        business_name: null,
        description: null,
        service_category: null,
        available_booking: null,
        available_appoints: null,
        rating: null,
        no_of_ratings: null,
        no_of_bookings: null,
        no_of_appoints: null,
        created_date: null,
        created_time: null,
        rate: null,
        rate_type: null,
        pay_on_meet: null,
        image_01: null,
        image_02: null,
        image_03: null
  };


  constructor(private router: Router,
              public serviceService: ServiceService,
              public eventPlannerService: EventPlannerService,
              public datepipe: DatePipe,
              public dialog: MatDialog) { }

  ngOnInit() {
      // get the service
      this.serviceService.getService();
      this.serviceSub = this.serviceService.getServiceUpdateListener()
        .subscribe((recievedService: Service) => {
          if (recievedService) {
            this.service = recievedService;
            console.log(this.service);
            this.removed = false;
            this.editmode = false;
          }
    });

      if (this.editable === true) {
    // import categories
      this.serviceService.getCategories();
      this.categorySub = this.serviceService.getCategoriesUpdateListener()
        .subscribe((recievedData: ServiceCategories[]) => {
        this.categories = recievedData;
        console.log(this.categories);
    });


    // import quantity types
      this.serviceService.getRates();
      this.ratesSub = this.serviceService.getRatesUpdateListener()
        .subscribe((recievedData: ServiceRates[]) => {
        this.rates = recievedData;
        console.log(this.rates);
    });
    }
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    if (this.ratesSub) {
      this.ratesSub.unsubscribe();
    }
    this.clearImages();
    this.editmode = false;
    this.removed = false;

  }


  // update product
  updateService(updateServiceForm: NgForm) {
    if (updateServiceForm.invalid) {
      console.log('Form Invalid');
    } else {
      const service: Service = {
        service_id: this.service.service_id,
        service_name: updateServiceForm.value.service_name,
        business_name:  this.service.business_name,
        description: updateServiceForm.value.description,
        service_category: updateServiceForm.value.category,
        available_booking: this.booleanValue(updateServiceForm.value.available_booking),
        available_appoints: this.booleanValue(updateServiceForm.value.available_appoints),
        rating: this.service.rating,
        no_of_ratings: this.service.no_of_ratings,
        no_of_bookings: this.service.no_of_bookings,
        no_of_appoints: this.service.no_of_appoints,
        created_date: this.service.created_date,
        created_time: this.service.created_time,
        rate: updateServiceForm.value.rate,
        rate_type: updateServiceForm.value.rate_type,
        pay_on_meet: this.booleanValue(updateServiceForm.value.pay_on_meet),
        image_01:  this.service.image_01,
        image_02:  this.service.image_02,
        image_03:  this.service.image_03
        };
      this.serviceService.updateService(service, [this.image01, this.image02, this.image03]);
      this.serviceSub = this.serviceService.getServiceUpdateListener()
      .subscribe((recievedService: Service) => {
        console.log(recievedService);
        this.service = recievedService;
        this.clearImages();
      });
      console.log('Service updated successfully!');
      updateServiceForm.resetForm();
      this.editmode = false;
    }
  }

  // remove service
  removeService(serviceId: string) {
    this.serviceService.removeService(serviceId);
    this.removed = true;
  }

  // clear image cache
  clearImages() {
    this.image01Url = './assets/images/merchant/nopic.png';
    this.image02Url = './assets/images/merchant/nopic.png';
    this.image03Url = './assets/images/merchant/nopic.png';
    this.image01 = null;
    this.image02 = null;
    this.image03 = null;
  }

  // to be modified later (optional function)
  showBprofile() {
    this.router.navigate(['/sp/bprofile']);
  }

  // image 01 uploading
  onImage01Uploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image01 = file;
      this.image01Url = reader.result;
    };
  }

  // image 02 uploading
  onImage02Uploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image02 = file;
        this.image02Url = reader.result;
      };
  }

   // image 03 uploading
  onImage03Uploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image03 = file;
      this.image03Url = reader.result;
    };
  }

  // set boolean value for service update
  booleanValue(value: any) {
    if (value ===  '' || value === null || value === undefined) {
      return false;
    } else {return value; }
  }


  // print a HTML component
  printBill() {

  }

  // create a booking
  createBooking(bookingForm: NgForm ) {

  }

  // create an appointment
  createAppointment( appointForm: NgForm ) {

  }


  // check booking availability
  checkAvailability(fromDate: string, toDate: string) {
    // this.serviceService.checkAvailability(fromDate: string, toDate: string)
    this.dialog.open(SuccessComponent,
      {data: {message: 'Sorry! The Service not available on selected Dates'}});
  }


  // check appointment availability
  checkAppointAvailability(appointDate: string) {
      // this.serviceService.checkAppointAvailability(appointDate: string)
      console.log(this.appointment.date , '   ' , this.appointment.time);
      this.refactorAppointDates();
      this.dialog.open(SuccessComponent,
        {data: {message: 'Sorry! The Service not available on selected Date'}});
  }


  // refactor appointment dates
  refactorAppointDates() {
    this.appointment.date.setHours(this.appointment.time.hour, this.appointment.time.minute, 0);
    const appointedDateString = this.appointment.date.toISOString();
    console.log(appointedDateString);
  }


  // refactor booking dates
  refactorDates() {
    if (this.dates.fromDate instanceof Date) {
      this.dates.fromDate = this.dates.fromDate.toISOString();
    }
    if (this.dates.toDate instanceof Date) {
      this.dates.toDate = this.dates.toDate.toISOString();
    }
  }


  // calculate payment for booking
  calcPayment(rateType: string, rate: number): number {
    console.log(this.dates.toDate , '  and  ', this.dates.fromDate);
    const duration = Math.abs(this.fromTime.hour - this.toTime.hour);
    this.refactorDates();
    const td = Number(this.dates.toDate.slice(8, 10));
    const fd = Number(this.dates.fromDate.slice(8, 10));
    const noOfDays = td - fd + 1; // may require modification
    console.log(duration);
    console.log(noOfDays);
    let newRate = rate;
    if (rateType === '/Hr') {
      newRate = rate * duration * noOfDays;
    } else if (rateType === '/Day') {
      newRate = rate * noOfDays;
    }
    this.totalAmount = newRate;
    this.payAmount = newRate / 10;
    return newRate;
  }

}
