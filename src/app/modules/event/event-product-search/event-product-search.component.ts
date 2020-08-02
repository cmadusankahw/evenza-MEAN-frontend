import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay} from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Filteration } from '../../event/event.model';
import { EventService } from '../event.service';
import { ProductCategories, Product, ProductQuery } from '../../product/product.model';
import { ProductService } from '../../product/product.service';


@Component({
  selector: 'app-event-product-search',
  templateUrl: './event-product-search.component.html',
  styleUrls: ['./event-product-search.component.scss']
})
export class EventProductSearchComponent implements OnInit, OnDestroy {

// subscription
private productSub: Subscription ;
private categorySub: Subscription ;
private searchedProductSub: Subscription;

// this is main product list
public products: Product[] = [];
// filter-categories
public categories: ProductCategories[] = [];
// filter-draw-state
public opened = false;
// show product details
public success = false;
// log in state
public islogged = true;
// recived eventId for event based product search
public eventId: string;
// filterationss for product search
public filter: Filteration;

// temp value for user ratings
ratings = 0;
priceStart = 0;
priceEnd = 49999;
priceEndStatic = 49999;
productCategory = 'All Products';
payOnDelivery = true;

isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver,
            public productService: ProductService, private eventService: EventService) { }

ngOnInit() {

    // get emitted filters
      this.eventId = this.eventService.getSelectedEvent(); // for an overall search

     // get relavant emitted filters
      this.filter = this.eventService.getSelectedFilteration();

   // search and list filtered services
      if (this.filter) {
        // setting filters
        this.eventId = this.filter.eventId; // for a specific filtered search
        this.productCategory = this.filter.category;
        this.priceEnd = this.filter.allocated_budget;
        this.priceEndStatic = this.filter.allocated_budget;
        setTimeout( () => {
          this.searchProducts();
        }, 700);
      }

}

ngOnDestroy() {
  if (this.productSub) {
  this.productSub.unsubscribe();
  }
  if (this.categorySub){
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

// send selected product to the productdetails componenent
sendProduct(product: Product) {
  this.success = this.productService.setProduct(product);
 }


}
