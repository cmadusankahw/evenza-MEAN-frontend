import { Component, OnInit, Input } from '@angular/core';

import { ServiceCard} from '../service.model';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  //service card ownership
  @Input() isowner = false;

   //filtering
   @Input() category = 'any';

  serviceDetails: ServiceCard[] = [
    {
      service_id: 'S-01', business_id: 'B-01', service_name: 'Dream Photography', description: 'this is sample description',
      service_category: 'Photography', no_of_bookings: 4, no_of_appoints: 2, rating: 3.2, rate: 1500, rate_type: '/Hr', feature_img: './assets/images/services/1.jpg'
    },
    {
      service_id: 'S-02', business_id: 'B-01', service_name: 'Manjula Dressing', description: 'this is sample description',
      service_category: 'Dressing', no_of_bookings: 11, no_of_appoints: 7, rating: 2.1, rate: 1500, rate_type: '/Day',feature_img: './assets/images/services/2.jpg'
    },
    {
      service_id: 'S-03', business_id: 'B-01', service_name: 'Corona Cabs', description: 'this is sample description',
      service_category: 'Transport', no_of_bookings: 5, no_of_appoints: 1, rating: 3.5, rate: 1500, rate_type: '/Day',feature_img: './assets/images/services/3.jpg'
    },
    {
      service_id: 'S-04', business_id: 'B-01', service_name: 'Photography', description: 'this is sample description',
      service_category: 'Photography', no_of_bookings: 4, no_of_appoints: 1, rating: 4.3, rate: 1500, rate_type: '/Hr',feature_img: './assets/images/services/4.jpg'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
