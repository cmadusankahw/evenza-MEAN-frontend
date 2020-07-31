import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Product } from '../../product/product.model';
import { Service } from '../../service/service.model';
import { ProductService } from '../../product/product.service';
import { ServiceService } from '../../service/service.service';


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
  @Input() recievedProduct: string;

  @Input() recievedService: string;

  // initial rating
  rating = 0;

  // review message
  reviewMsg = '';

  additionalRatingVal = 0;

  constructor(private router: Router, private productServie: ProductService, private serviceService: ServiceService) { }

  ngOnInit() {
    // router scroll
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  ngOnDestroy() {
    this.submitRating(this.id, this.type, this.reviewMsg);
  }

  submitRating(id: string, type: string, review: string) {
    console.log(this.rating);
    console.log(this.additionalRatingVal);
    const rate = Math.floor(( this.rating + this.additionalRatingVal) / 2 );
    console.log('rating: ', rate);
    if (type === 'product') {
      this.productServie.rateProduct(id, rate, review);
    } else if ( type === 'service') {
      this.serviceService.rateService(id, rate, review);
    }
  }



}
