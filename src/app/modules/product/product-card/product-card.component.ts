import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  // subscription
  private productSub: Subscription;

  // service card ownership
  @Input() isowner = false;

  @Input() islogged: boolean;

  // filtering
  @Input() category = 'any';

  // business name
  @Input() businessName: string;

  // products list
  products: Product[] = [];

  // show product details once loaded
  success = false;


  constructor(private router: Router,
              public productService: ProductService) { }

  ngOnInit() {
    // get the product
    if (this.isowner) {
      this.productService.getSellerProducts();
      this.productSub = this.productService.getSellerProductUpdateListener()
        .subscribe((recievedProducts: Product[]) => {
          this.products = recievedProducts;
          console.log(this.products);
        });
    } else {
      this.productService.getProducts();
      this.productSub = this.productService.getProductsUpdateListener()
        .subscribe((recievedProducts: Product[]) => {
          this.products = recievedProducts;
          console.log(this.products);
        });
    }
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }


  sendProduct(product: Product) {
    this.success = this.productService.setProduct(product);
  }

  hasData() {
    if (this.products.length) {
      return true;
    } else {
      return false;
    }
  }

}
