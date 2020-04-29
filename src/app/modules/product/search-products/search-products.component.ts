import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ProductCategories, Product, Businesses, PaymentTypes } from '../product.model';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  // this is main product list
  products: Product[] = [
    {
      product_id: 'P-01',
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
      image_01: './assets/images/products/1.jpg',
      image_02: './assets/images/merchant/nopic.png',
      image_03: './assets/images/merchant/nopic.png'
    },
  ];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // filters - derived arrays from main list

  // filter-categories
  categories: ProductCategories[] = [
    { id: '1', val: 'Best Selling' },
    { id: '1', val: 'Party & Celebrations' },
    { id: '1', val: 'Wedding Ceramanies' },
    { id: '1', val: 'Meetups & Gatherings' },
    { id: '1', val: 'Entertainment' },
  ];

  // filter-companies
  businesses: Businesses[] = [
    { id: '1', val: 'Chiran\'s' },
    { id: '1', val: 'Manjula Catering' },
    { id: '1', val: 'Samanthi Foods' },
  ];

  // filter-pay types
  paymentTypes: PaymentTypes[] = [
    { id: '1', val: 'Pay on Delivery' },
    { id: '2', val: 'Visa' },
    { id: '3', val: 'PayHere' },
  ];

  // temp value for user ratings
  ratings = 0;

  // temp slider options
  priceStart = 0;
  priceEnd = 49999;

  // filter-drawe-state
  opened = false;

  // enable searching mode
  searching = false;


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

  }

  hasData() {
    if (this.products.length) {
      return true;
    } else {
      return false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  searchProducts() {
    this.searching = !this.searching;
  }


}
