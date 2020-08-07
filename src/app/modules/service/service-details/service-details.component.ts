import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Service, ServiceCategories, ServiceRates, Booking, Appointment, Promotion } from '../service.model';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { refactorDate, calcDateDuration } from '../../event/event.model';

declare let paypal: any;

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
  @Input() public isowner = false;
  // editablity
  @Input() public editable = true;
  // is logged as event planner and booking dates recieved
  @Input() public islogged = true;
  // service removed
  @Input() public removed = false;
  // recieved event ID for event related booking
  @Input() public eventId: string;
  // booking default date and time
  @Input() public bookingTime = {fromDate: this.today,
    toDate: this.today,
    fromTime: {hour: 8, minute: 0},
    toTime: {hour: 18, minute: 0}
  };

  // book now mode
  public bookUser = false;
  // make appointment
  public appoint = false;
  // edit mode by parent comp
  public editmode = false;
  // appointment default date and time
  public appointment = {date: this.today, time: {hour: 8, minute: 0} };
  // recieved categories
  public categories: ServiceCategories[] = [];
  // recieved quantities
  public rates: ServiceRates[] = [];
  // recieved service (initial declaration)
  public service: Service ;
   // created promotion
   public promotion: Promotion = { from_date: '',
                                    to_date: '',
                                    title: 'New Promotion',
                                    precentage: 0 };

  public tday = new Date();
  public totalAmount = 0.0;
  public totalPromotion = 0;
  public payAmount = 0.0;
  public payPalAmount = 0;
  public duration = 0;
  public start = new Date();
  public end = new Date();

  // images to upload
  image01: File;
  image01Url: any = './assets/images/merchant/nopic.png';
  image02: File;
  image02Url: any = './assets/images/merchant/nopic.png';
  image03: File;
  image03Url: any = './assets/images/merchant/nopic.png';


  // paypal integration
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ASFjH19PwcA-QJn05nR3Lh2g_T3LJtEfX8NnXXTCNvlNgA5zri1wOOUoDzCdFNPYOC3SM2YfKNR8HvAg',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create ( {
        payment: {
          transactions: [
            {amount: { total: this.payPalAmount , currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize : (data, actions) => {
      return actions.payment.execute().then ( payment => {
        // make order if the payment is successed
        document.getElementById('placeOrder').click();
      });
    }
  };

  addScript = false;

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

     // check for recieved eventId
      if (this.eventId) {
       console.log(this.eventId);
      }

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


  addPaypal() {
    if(!this.addScript) {
      this.addPaypalScript().then( () =>{
        paypal.Button.render( this.paypalConfig, '#paybtn');
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise( ( resolve, reject) => {
      let scriptTagelement = document.createElement('script');
      scriptTagelement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagelement.onload = resolve;
      document.body.appendChild(scriptTagelement);
    })
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
        reviews: this.service.reviews,
        promotions: this.service.promotions,
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


  // calculate payment for booking
  calcPayment(rateType: string, rate: number): number {
    const date1 = refactorDate(this.bookingTime.fromDate, this.bookingTime.fromTime);
    const date2 = refactorDate(this.bookingTime.toDate, this.bookingTime.toTime);
    const diffDays = calcDateDuration(new Date(date1), new Date(date2));
    let promotion = 0;
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
    if (this.service.promotions.length) {
        for (const p of this.service.promotions) {
          promotion += (newRate * p.precentage) / 100;
        }
    }
    this.totalAmount = newRate - promotion;
    this.totalPromotion = promotion;
    this.payAmount = newRate / 10;
    return newRate;
  }

  // create a booking
    createBooking(bookingForm: NgForm ) {
      if (bookingForm.invalid) {
        console.log('Form Invalid');
      } else {
        // calculating the payments
        this.calcPayment(this.service.rate_type, this.service.rate);

          // create the booking object
        const booking: Booking = {
          booking_id: 'B0',
          service_id: this.service.service_id,
          event_id: 'none',
          service_name: this.service.service_name,
          service_category: this.service.service_category,
          event_name: 'Not Assigned',
          business_name: this.service.business_name,
          rate_type: this.service.rate_type,
          created_date: new Date().toISOString(),
          state: 'pending',
          review: 'not reviewed yet',
          from_date: refactorDate(this.bookingTime.fromDate, this.bookingTime.fromTime),
          to_date: refactorDate(this.bookingTime.toDate, this.bookingTime.toTime),
          duration: this.duration, //
          comment: bookingForm.value.comment,
          amount: this.totalAmount,
          commission_due: this.totalAmount / 10,
          amount_paid: bookingForm.value.amount_paid
          };

        // creating the booking
        if (this.eventId) {
          booking.event_id = this.eventId;
          this.serviceService.createEventBooking(booking);
        } else {
          this.serviceService.createBooking(booking);
        }
        this.bookUser = !this.bookUser;
        this.appoint = false;
      }
    }

    // create an appointment
    createAppointment( appointForm: NgForm ) {
      if (appointForm.invalid) {
        console.log('Form Invalid');
      } else {

        // creating appointment object
        const appointment: Appointment = {
          appoint_id: 'A0',
          service_id: this.service.service_id,
          event_id: 'Not Assigned',
          service_name: this.service.service_name,
          service_category: this.service.service_category,
          event_name: 'Not Assigned',
          business_name: this.service.business_name,
          created_date: new Date().toISOString(),
          state: 'pending',
          appointed_date: refactorDate(this.appointment.date, this.appointment.time),
          comment: appointForm.value.comment,
          };

        // creating the appointment
        if (this.eventId) {
          appointment.event_id = this.eventId;
          this.serviceService.createEventAppointment(appointment);
        } else {
          this.serviceService.createAppointment(appointment);
        }
        this.appoint = false;
      }
    }


    // check booking availability
    checkAvailability() {
      this.serviceService.checkAvailability(
        refactorDate(this.bookingTime.fromDate, this.bookingTime.fromTime),
        refactorDate(this.bookingTime.toDate, this.bookingTime.toTime),
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


  // add new promotion
  addPromotion() {
    this.promotion.from_date = this.start.toISOString();
    this.promotion.to_date = this.end.toISOString();
    console.log(this.promotion);
    this.serviceService.addPromotion(this.promotion, this.service.service_id);
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

}
