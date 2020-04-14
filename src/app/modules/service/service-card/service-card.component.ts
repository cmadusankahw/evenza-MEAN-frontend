import { Component, OnInit, Input } from '@angular/core';

export interface ServiceCard {
  service_id: string;
  business_id: string;
  service_name: string;
  description: string;
  service_category: string;
  no_of_bookings: number;
  no_of_appoints: number;
  rating: number;
  feature_img: string;
}


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  //service card ownership
  @Input() isowner = false;

  serviceDetails: ServiceCard[] = [
    {
      service_id: 'S-01', business_id: 'B-01', service_name: 'Dream Photography', description: 'this is sample description',
      service_category: 'Photography', no_of_bookings: 4, no_of_appoints: 2, rating: 3.2, feature_img: './assets/images/services/1.jpg'
    },
    {
      service_id: 'S-02', business_id: 'B-01', service_name: 'Manjula Dressing', description: 'this is sample description',
      service_category: 'Dressing', no_of_bookings: 11, no_of_appoints: 7, rating: 2.1, feature_img: './assets/images/services/2.jpg'
    },
    {
      service_id: 'S-03', business_id: 'B-01', service_name: 'Corona Cabs', description: 'this is sample description',
      service_category: 'Transport', no_of_bookings: 5, no_of_appoints: 1, rating: 3.5, feature_img: './assets/images/services/3.jpg'
    },
    {
      service_id: 'S-04', business_id: 'B-01', service_name: 'Photography', description: 'this is sample description',
      service_category: 'Photography', no_of_bookings: 4, no_of_appoints: 1, rating: 4.3, feature_img: './assets/images/services/4.jpg'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
