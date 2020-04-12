import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Services {
  id: string;
  business_id: string;
  business_name: string;
  title: string;
  description: string;
  category: string;
  available_booking: boolean;
  available_appoints: boolean;
  open_days_as_business : boolean;
  no_of_bookings: number;
  no_of_appoints: number;
  rate: number;
  rate_type: string;
  pay_on_meet: boolean;
  feature_img: string;
}

export interface Categories {
  id: string;
  val: string;
}

export interface Rates {
  id: string;
  val: string;
}

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  currentRate = 3;
  iseditable = false;

  //edit mode
  editmode = false;

  //add new service mode
  addnew = false;

  //temp ad new view availability changer
  temp_open = false;
  temp_pay_on_meet= false;

  serviceDetails: Services[] = [
    {
      id: 'S-01',
      business_id: 'B-01',
      business_name : 'Dream Business',
      title: 'Dream Photography',
      description: `Creative Worth Photography Studio is a community based professional photography business given to quality portraiture and full wedding coverage. Creative Worth seeks to provide a service to individuals, couples, and families that emphasizes and enhances the quality of their relationships through photographic imaging.`,
      category: 'Photography',
      available_booking: true,
      available_appoints: true,
      open_days_as_business: true,
      no_of_bookings: 4,
      no_of_appoints: 2,
      rate: 256.37,
      rate_type: 'Per Hour /Hr',
      pay_on_meet: false,
      feature_img: './assets/images/services/1.jpg'
    },
  ];

  categories: Categories[] = [
    { id: '1', val: 'Photography' },
    { id: '2', val: 'Dressing' },
    { id: '3', val: 'Transport' },
  ];

  rates: Rates[] = [
    { id: '1', val: 'Per Hour /Hr' },
    { id: '2', val: 'Pre Day /Day' },
    { id: '3', val: 'Fixed Rate' },
  ];


  constructor( private router: Router ) { }

  ngOnInit() {
  }

  createService(){
    console.log('Service Created');
  }

  showBprofile() {
    this.router.navigate(['/m/bprofile']);
  }

}
