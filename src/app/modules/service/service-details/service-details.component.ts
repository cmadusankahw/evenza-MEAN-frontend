import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Service {
  service_id: string;
  service_name: string;
  business_id: string;
  business_name: string;
  description: string;
  service_category: string;
  available_booking: boolean;
  available_appoints: boolean;
  open_days_as_business: boolean;
  rating: number;
  no_of_ratings: number;
  no_of_bookings: number;
  no_of_appoints: number;
  rate: number;
  rate_type: string;
  payment_type: string;
  feature_img: string;
  image_01: string;
  image_02: string;
  image_03: string;
}

export interface ServiceCategories {
  id: string;
  val: string;
}

export interface ServiceRates {
  id: string;
  val: string;
}

export interface PaymentTypes {
  id: string;
  val: string;
}

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  //service is editable
  @Input() isowner;

  //edit mode
  @Input() editmode = false;

  //add new service mode
  @Input() addnew = false;

  //temp ad new view availability changer
  temp_open = false;
  temp_pay_on_meet = false;

  serviceDetails: Service[] = [
    {
      service_id: 'S-01',
      service_name: 'Dream Photography',
      business_id: 'B-01',
      business_name: 'Dream Business',
      description: `Creative Worth Photography Studio is a community based professional photography business given to quality portraiture and full wedding coverage. Creative Worth seeks to provide a service to individuals, couples, and families that emphasizes and enhances the quality of their relationships through photographic imaging.`,
      service_category: 'Photography',
      available_booking: true,
      available_appoints: true,
      open_days_as_business: true,
      rating: 3.5,
      no_of_ratings: 125,
      no_of_bookings: 4,
      no_of_appoints: 2,
      rate: 256.37,
      rate_type: '/Hr',
      payment_type: 'Pay on Meet',
      feature_img: './assets/images/services/1.jpg',
      image_01: './assets/images/merchant/nopic.png',
      image_02: './assets/images/merchant/nopic.png',
      image_03: './assets/images/merchant/nopic.png'
    },
  ];

  categories: ServiceCategories[] = [
    { id: '1', val: 'Photography' },
    { id: '2', val: 'Dressing' },
    { id: '3', val: 'Transport' },
  ];

  rates: ServiceRates[] = [
    { id: '1', val: '/Hr' },
    { id: '2', val: '/Day' },
    { id: '3', val: 'Fixed' },
  ];

  paymentTypes: PaymentTypes[] = [
    { id: '1', val: 'Pay on Meet' },
    { id: '2', val: 'Visa' },
    { id: '3', val: 'PayHere' },
  ];


  constructor(private router: Router) { }

  ngOnInit() {
  }

  createService() {
    console.log('Service Created');
  }

  showBprofile() {
    this.router.navigate(['/sp/bprofile']);
  }

}
