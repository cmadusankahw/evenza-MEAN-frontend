import { Component, OnInit, Input } from '@angular/core';

import { ProductCard} from '../product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  //service card ownership
  @Input() isowner = false;

  //filtering
  @Input() category = 'any';

  productDetails: ProductCard[] = [
    {
      product_id: 'P-01', business_id: 'B-01', product: 'Setty Back', description: ' this is a wedding equipment',
      product_category: 'Wedding Eq', no_of_orders: 4, price: 1579.00, rating: 3.3, feature_img: './assets/images/products/1.jpg'
    },
    {
      product_id: 'P-02', business_id: 'B-02', product: 'Wedding Cake', description: 'Best Wedding Cakes',
      product_category: 'Cakes & Sweets', no_of_orders: 4, price: 499.00, rating: 3.3, feature_img: './assets/images/products/2.jpg'
    },
    {
      product_id: 'P-03', business_id: 'B-03', product: 'Sumana Florists', description: 'Fresh flowers',
      product_category: 'Flower', no_of_orders: 4, price: 134.56, rating: 3.3, feature_img: './assets/images/products/3.jpg'
    },
    {
      product_id: 'P-04', business_id: 'B-04', product: 'Dining Set', description: ' Dharmawardhana Renters',
      product_category: 'Catering', no_of_orders: 4, price: 2345.20, rating: 3.3, feature_img: './assets/images/products/4.jpg'
    }
  ];

  productDetailsNew: Array<ProductCard> = [...this.productDetails];

  constructor() { }

  ngOnInit() {
    console.log(this.productDetails);
  }

  hasData() {
    if (this.productDetails.length) {
      return true;
    } else {
      return false;
    }
  }

}
