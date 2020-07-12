import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Product } from '../../product/product.model';
import { Service } from '../../service/service.model';


@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.scss']
})
export class RatingReviewComponent implements OnInit, OnDestroy {

  // type of item (a service or a product)
  @Input() type: string;

  // item id (product.product_id or service.service_id)
  @Input() id: string;

  // recieve product or service
  recievedProduct: Product;

  recievedService: Service;

  // initial rating
  rating = 0;

  additionalRatingVal = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.type === 'product') {
      this.getProduct(this.id);
    } else if (this.type === 'service') {
      this.getService(this.id);
    }
    // router scroll
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  ngOnDestroy() {
  }

  getProduct(productId: string) {
  }

  getService(serviceId: string) {
  }

  additionalRating(rateNum: number) {
    this.additionalRatingVal = rateNum;
    this.submitRating();
  }

  submitRating() {
    console.log(this.rating);
    console.log(this.additionalRatingVal);
    console.log('changes submitted');

    // update product or service rating code here
  }

}
