import { Component, OnInit } from '@angular/core';


export interface Product {
  product_id: string;
  business_id: string;
  business_name: string;
  product: string;
  product_category: string;
  qty_type: string;
  description: string;
  created_date: string;
  created_time: string;
  availability: boolean;
  inventory: number;
  rating: number;
  no_of_orders: number;
  delivery_service: string;
  price: number;
}

export interface ProductCategories {
  id: string;
  val: string;
}

export interface PrdouctRates {
  id: string;
  val: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  products: Product[] = [
    { product_id: 'P-01',
      business_id: 'B-01',
      business_name: 'Chiran\' Business',
      product: 'Setty Back',
      product_category: 'Wedding Eq',
      qty_type: 'Units',
      description: 'sample product description',
      created_date: '04/17/2020',
      created_time: '03:45',
      availability: true,
      inventory: 24,
      rating: 3.2,
      no_of_orders: 14,
      delivery_service: 'DHL',
      price: 12499.00},
  ];

  constructor() { }

  ngOnInit() {
  }

}
