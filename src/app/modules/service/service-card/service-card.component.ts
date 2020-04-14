import { Component, OnInit, Input } from '@angular/core';

export interface ServiceCard {
  service_id: string;
  business_id: string;
  service_name: string;
  description: string;
  service_category: string;
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

  //service card ownership
  @Input() isowner = false;

  serviceDetails: ServiceCard[] = [
    {
      service_id: '1', business_id: 'B-01' ,service_name: 'Dream Photography', description: ' this is a photography Service',
     service_category: 'Photography',  no_of_bookings: 4, no_of_appoints: 2, feature_img: './assets/images/services/1.jpg'
    },
    {
      service_id: '2', business_id: 'B-01', service_name: 'Manjula Dressing', description: ' this is a dressing Service',
      service_category: 'Dressing', no_of_bookings: 11, no_of_appoints: 7, feature_img: './assets/images/services/2.jpg'
    },
    {
      service_id: '3', business_id: 'B-01', service_name: 'Corona Cabs', description: ' this is a cab Service',
      service_category: 'Transport', no_of_bookings: 5,  no_of_appoints: 1, feature_img: './assets/images/services/3.jpg'
    },
    {
      service_id: '4', business_id: 'B-01', service_name: 'Photography', description: ' this is photography Service',
      service_category: 'Photography', no_of_bookings: 4,  no_of_appoints: 1, feature_img: './assets/images/services/4.jpg'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
