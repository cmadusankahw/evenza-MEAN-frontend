import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Services {
  id: string;
  title: string;
  description: string;
  category: string;
  no_of_bookings: number;
  no_of_appoints: number;
  rate: number;
  rate_type: string;
  business_name: string;
  feature_img: string;
}

export interface Categories {
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

  serviceDetails = [
    {
      id: '1', title: 'Dream Photography', description: `Creative Worth Photography Studio is a community based professional photography business given to quality portraiture and full wedding coverage. Creative Worth seeks to provide a service to individuals, couples, and families that emphasizes and enhances the quality of their relationships through photographic imaging.`,
      category: 'Photography', no_of_bookings: 4, no_of_appoints: 2,  rate: 256.37, rate_type: '/Hr', business_name : 'Dream Business',
      feature_img: './assets/images/services/1.jpg'
    },
  ];

  categories = [
    { id: '1', val: 'Photography' },
    { id: '2', val: 'Dressing' },
    { id: '3', val: 'Transport' },
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
