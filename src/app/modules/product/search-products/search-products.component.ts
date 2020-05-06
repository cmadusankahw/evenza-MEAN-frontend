import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ProductCategories, Product, PaymentTypes } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

    // subscription
    private productSub: Subscription ;
    private categorySub: Subscription ;

  // this is main product list
  products: Product[] = [];

  // this is serached product list
  searchedProducts: Product[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // filters - derived arrays from main list

  // filter-categories
  categories: ProductCategories[] = [];


  // temp value for user ratings
  ratings = 0;

  // temp slider options
  priceStart = 0;
  priceEnd = 49999;

  // filter-draw-state
  opened = false;

  // enable searching mode
  searching = false;


  constructor(private breakpointObserver: BreakpointObserver,
              public productService: ProductService) { }

  ngOnInit() {
        // get the product
        this.productService.getProducts();
        this.productSub = this.productService.getProductsUpdateListener()
          .subscribe((recievedProducts: Product[]) => {
              this.products = recievedProducts;
              console.log(this.products);
      });

       // import categories
        this.productService.getCategories();
        this.categorySub = this.productService.getCategoriesUpdateListener()
         .subscribe((recievedData: ProductCategories[]) => {
         this.categories = recievedData;
         console.log(this.categories);
     });
  }

  ngOnDestroy() {
    if (this.productSub) {
    this.productSub.unsubscribe();
    }
    if (this.categorySub){
      this.categorySub.unsubscribe();
    }
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
