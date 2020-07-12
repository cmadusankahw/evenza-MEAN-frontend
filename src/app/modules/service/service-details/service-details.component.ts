import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Service, ServiceCategories, ServiceRates, Booking, Appointment } from '../service.model';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';
import { ErrorComponent } from 'src/app/error/error.component';


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


  // book now mode
  bookUser = false;

  // make appointment
  appoint = false;

  // edit mode by parent comp
  editmode = false;

  // service removed
  @Input() removed = false;

  // total amount
  totalAmount = 0.0;
  payAmount = 0.0;


  // booking default times time
  duration = 0;

  // appointment default date and time
  appointment = {date: this.today, time: {hour: 8, minute: 0, second: 0} };

  // booking default date and time
  @Input() bookingTime = {fromDate: this.today,
    toDate: this.today,
    fromTime: {hour: 8, minute: 0, second: 0},
    toTime: {hour: 18, minute: 0, second: 0}
  };

  tday = new Date();

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

    // router scroll
      this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
     });

      if (this.editable === true) {
    // import categories
      this.serviceService.getCategories();
      this.categorySub = this.serviceService.getCategoriesUpdateListener()
        .subscribe((recievedData: ServiceCategories[]) => {
        this.categories = recievedData;
        console.log(this.categories);
    });

    // import rate types
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
        available_booking: this.service.available_booking,
        available_appoints: this.service.available_appoints,
        rating: this.service.rating,
        no_of_ratings: this.service.no_of_ratings,
        no_of_bookings: this.service.no_of_bookings,
        no_of_appoints: this.service.no_of_appoints,
        created_date: this.service.created_date,
        rate: updateServiceForm.value.rate,
        rate_type: updateServiceForm.value.rate_type,
        capacity: updateServiceForm.value.capacity,
        pay_on_meet: this.service.pay_on_meet,
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
      this.editmode = false;
    }
  }

  // remove service
  removeService(serviceId: string) {
    this.serviceService.removeService(serviceId);
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
          service_category: this.service.service_category,
          event_name: 'Not Assigned',
          business_name: this.service.business_name,
          rate_type: this.service.rate_type,
          created_date: new Date().toISOString(),
          state: 'pending',
          review: 'not reviewed yet',
          from_date: this.bookingTime.fromDate.toISOString(),
          to_date: this.bookingTime.toDate.toISOString(),
          duration: this.duration,
          from_time: this.bookingTime.fromTime,
          to_time: this.bookingTime.toTime,
          comment: bookingForm.value.comment,
          amount: this.totalAmount,
          commission_due: this.totalAmount / 10,
          amount_paid: bookingForm.value.amount_paid
          };
        this.serviceService.createBooking(booking);
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
          created_date: new Date().toISOString(),
          state: 'pending',
          appointed_date: this.appointment.date.toISOString(),
          appointed_time: this.appointment.time,
          comment: appointForm.value.comment,
          };
        this.serviceService.createAppointment(appointment);
        this.appoint = false;
      }
    }


    // check booking availability
    checkAvailability() {
      this.serviceService.checkAvailability(this.bookingTime.fromDate.toISOString(),
                                            this.bookingTime.toDate.toISOString(),
                                            this.service.service_id)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        if ( recievedData.availability) {
          this.dialog.open(SuccessComponent,
            {data: {message: 'Service is available on selected dates!'}});
        } else {
          this.dialog.open(ErrorComponent,
            {data: {message: 'Sorry! The Service not available on selected Dates'}});
        }
      });
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
   // this.router.navigate(['/sp/bprofile']);
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


  // calculate payment for booking
  calcPayment(rateType: string, rate: number): number {
    const date1 = this.bookingTime.fromDate;
    const date2 = this.bookingTime.toDate;
    const diffDays  = Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
                      Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) ) / (1000 * 60 * 60 * 24)) + 1;
    console.log(this.duration);
    console.log(diffDays);
    let newRate = rate;
    if (rateType === '/Hr') {
      this.duration = Math.abs(this.bookingTime.fromTime.hour - this.bookingTime.toTime.hour) * diffDays;
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
