import { Component, OnInit } from '@angular/core';

export interface Services {
  id: string;
  title: string;
  description: string;
  category: string;
  no_of_bookings: number;
  no_of_appoints: number;
  rate: number;
  rate_type: string;
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
  iseditable = true;

  //edit mode
  editmode = false;

  //add new service mode
  addnew = false;

  serviceDetails = [
    {
      id: '1', title: 'Dream Photography', description: `Creative Worth Photography Studio is a community based professional photography business given to quality portraiture and full wedding coverage. Creative Worth seeks to provide a service to individuals, couples, and families that emphasizes and enhances the quality of their relationships through photographic imaging.`,
      no_of_bookings: 4, category: 'Photography', rate: 256.37, rate_type: '/Hr', no_of_appoints: 2,
      feature_img: './assets/images/services/1.jpg'
    },
  ];

  categories = [
    { id: '1', val: 'Photography' },
    { id: '2', val: 'Dressing' },
    { id: '3', val: 'Transport' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
