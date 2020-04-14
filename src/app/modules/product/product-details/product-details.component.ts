import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  no_of_ratings: number;
  no_of_orders: number;
  delivery_service: string;
  price: number;
  payment_type: string;
  feature_img: string;
  image_01: string;
  image_02: string;
  image_03: string;
}

export interface ProductCategories {
  id: string;
  val: string;
}

export interface QuantityTypes {
  id: string;
  val: string;
}

export interface PaymentTypes {
  id: string;
  val: string;
}


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  //service is editable
  @Input() isowner;

  //edit mode
  @Input() editmode = false;

  //add new service mode
  @Input() addnew = false;

  //temp ad new view availability changer
  temp_open = false;
  temp_pay_on_meet = false;

  products: Product[] = [
    {
      product_id: 'P-01',
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
      no_of_ratings: 158,
      no_of_orders: 14,
      delivery_service: 'DHL',
      price: 12499.00,
      payment_type: 'Pay on Meet',
      feature_img: './assets/images/products/1.jpg',
      image_01: './assets/images/merchant/nopic.png',
      image_02: './assets/images/merchant/nopic.png',
      image_03: './assets/images/merchant/nopic.png'
    },
  ];


  categories: ProductCategories[] = [
    { id: '1', val: 'Wedding Eq' },
    { id: '2', val: 'Cakes & Sweets' },
    { id: '3', val: 'Flowers' },
    { id: '3', val: 'Catering' },
  ];

  quantities: QuantityTypes [] = [
    { id: '1', val: 'Units' },
    { id: '2', val: 'Kg' },
    { id: '3', val: 'Ltr' },
    { id: '4', val: 'm' },
  ];

  paymentTypes: PaymentTypes[] = [
    { id: '1', val: 'Pay on Delivery' },
    { id: '2', val: 'Visa' },
    { id: '3', val: 'PayHere' },
  ];


  constructor(private router: Router) { }

  ngOnInit() {
  }

  createProduct() {
    console.log('Product Created');
  }

  showBprofile() {
    this.router.navigate(['/sp/bprofile']);
  }

  removeProduct(){
    console.log('product removed');
  }

}
