import { Component, OnInit } from '@angular/core';

export interface DeliveryService {
  delivery_id: string;
  delivery_name: string;
  address: string;
  hotline: number;
  delivery_rate: number;
  rate_type: string;
  min_delivery_time: number;
  max_delivery_time: number;
}


@Component({
  selector: 'app-seller-delivery',
  templateUrl: './seller-delivery.component.html',
  styleUrls: ['./seller-delivery.component.scss']
})
export class SellerDeliveryComponent implements OnInit {

  deliveryServices: DeliveryService[] = [
    {delivery_id: 'D-01',
    delivery_name: 'DHL',
    address: 'Main Street, Colombo 07',
    hotline: 713456678,
    delivery_rate: 300.00,
    rate_type: 'Fixed',
    min_delivery_time: 1,
    max_delivery_time: 3},
  ];

  constructor() { }

  ngOnInit() {
  }

}
