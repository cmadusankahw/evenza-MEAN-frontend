import { Component, OnInit } from '@angular/core';

export interface Services {
  id: string;
  title: string;
  description: string;
  category: string;
  no_of_bookings: number;
  no_of_appoints: number;
  feature_img: string;
}


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  serviceDetails = [
    {
      id: '1', title: 'Dream Photography', description: ' this is a photography Service',
      no_of_bookings: 4, category: 'Photography', no_of_appoints: 2, feature_img: './assets/images/services/1.jpg'
    },
    {
      id: '2', title: 'Manjula Dressing', description: ' this is a dressing Service',
      no_of_bookings: 11, category: 'Dressing', no_of_appoints: 7, feature_img: './assets/images/services/2.jpg'
    },
    {
      id: '3', title: 'Corona Cabs', description: ' this is a cab Service',
      no_of_bookings: 5, category: 'Transport', no_of_appoints: 1, feature_img: './assets/images/services/3.jpg'
    },
    {
      id: '4', title: 'Photography', description: ' this is photography Service',
      no_of_bookings: 4, category: 'Photography', no_of_appoints: 1, feature_img: './assets/images/services/4.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
