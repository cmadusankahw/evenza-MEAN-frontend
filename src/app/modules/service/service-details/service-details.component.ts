import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Service, ServiceCategories, ServiceRates, Booking, Appointment } from '../service.model';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {


// subscription
  private serviceSub: Subscription ;
  private categorySub: Subscription ;

  private today = new Date();

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
  fromTime = {hour: 8, minute: 0, second: 0};
  toTime = {hour: 18, minute: 0, second: 0};
  duration = 0;

  // appointment default date and time
  appointment = {date: this.today, time: {hour: 8, minute: 0, second: 0} };

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
  service: Service ;


  constructor(private router: Router,
              public serviceService: ServiceService,
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
            this.calcPayment(this.service.rate_type, this.service.rate);
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
      this.rates = this.serviceService.getRates();
    }
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
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

    // create a booking
    createBooking(bookingForm: NgForm ) {
      if (bookingForm.invalid) {
        console.log('Form Invalid');
      } else {
        this.calcPayment(this.service.rate_type, this.service.rate);
        const booking: Booking = {
          booking_id: 'B0',
          service_id: this.service.service_id,
          event_id: 'Not Assigned',
          service_name: this.service.service_name,
          event_name: 'Not Assigned',
          business_name: this.service.business_name,
          rate_type: this.service.rate_type,
          created_date: this.today.toISOString(),
          state: 'pending',
          review: 'not reviewed yet',
          from_date: this.dates.fromDate,
          to_date: this.dates.toDate,
          duration: this.duration,
          from_time: this.fromTime,
          to_time: this.toTime,
          comment: bookingForm.value.comment,
          amount: this.totalAmount,
          commission_due: this.totalAmount / 10,
          amount_paid: bookingForm.value.amount_paid
          };
        this.serviceService.createBooking(booking);
        // bookingForm.resetForm();
        this.bookUser = !this.bookUser;
        this.appoint = false;
      }
    }

    // create an appointment
    createAppointment( appointForm: NgForm ) {
      if (appointForm.invalid) {
        console.log('Form Invalid');
      } else {
        const appointment: Appointment = {
          appoint_id: 'A0',
          service_id: this.service.service_id,
          event_id: 'Not Assigned',
          service_name: this.service.service_name,
          event_name: 'Not Assigned',
          business_name: this.service.business_name,
          created_date: this.today.toISOString(),
          state: 'pending',
          appointed_date: this.appointment.date.toISOString(),
          appointed_time: this.appointment.time,
          comment: appointForm.value.comment,
          };
        this.serviceService.createAppointment(appointment);
        // appointForm.resetForm();
        this.appoint = false;
      }
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
        this.dialog.open(SuccessComponent,
          {data: {message: 'Sorry! The Service not available on selected Date'}});
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
    this.refactorDates();
    const date1 = new Date(this.dates.fromDate);
    const date2 = new Date(this.dates.toDate);
    const diffDays  = Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
                      Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) ) / (1000 * 60 * 60 * 24)) + 1;
    console.log(this.duration);
    console.log(diffDays);
    let newRate = rate;
    if (rateType === '/Hr') {
      this.duration = Math.abs(this.fromTime.hour - this.toTime.hour) * diffDays;
      newRate = rate * this.duration;
    }  else if (rateType === '/Day') {
      newRate = rate * diffDays;
      this.duration = diffDays;
    } else  {
      this.duration = diffDays;
    }
    this.totalAmount = newRate;
    this.payAmount = newRate / 10;
    return newRate;
  }

}
