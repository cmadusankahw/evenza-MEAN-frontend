import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { ProductCategories, Product, ProductQuery } from '../product.model';
import { ProductService } from '../product.service';
import { EventPlannerService } from '../../eventplanner/eventplanner.service';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  // subscription
  private productSub: Subscription;
  private categorySub: Subscription;
  private searchedProductSub: Subscription;

  // this is main product list
  products: Product[] = [];


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
  priceStart = 0;
  priceEnd = 49999;
  productCategory = 'All Products';
  payOnDelivery = true;

  // filter-draw-state
  opened = false;

  // show product details
  success = false;

  // log in state
  islogged = true;


  constructor(private breakpointObserver: BreakpointObserver,
              public productService: ProductService,
              private eventPlannerService: EventPlannerService) { }

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
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    if (this.searchedProductSub) {
      this.searchedProductSub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  searchProducts() {
    const searchQuery: ProductQuery = {
      category: this.productCategory,
      minPrice: this.priceStart,
      maxPrice: this.priceEnd,
      payOnDelivery: this.payOnDelivery,
      userRating: this.ratings
    };
    console.log(searchQuery);
    this.productService.searchProducts(searchQuery);
    this.searchedProductSub = this.productService.getSearchedProductUpdatedListener()
      .subscribe((recievedData: Product[]) => {
        this.products = recievedData;
        console.log(this.products);
      });
  }

  // send user details to the inquery for
  emitUser() {
    this.eventPlannerService.setUser('');
  }


  sendProduct(product: Product) {
    this.success = this.productService.setProduct(product);
  }

}
