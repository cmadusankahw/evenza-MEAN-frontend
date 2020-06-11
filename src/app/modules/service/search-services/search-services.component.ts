import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, merge } from 'rxjs';
import { map, shareReplay, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';



import {Service, ServiceCategories, ServiceQuery, Booking } from '../service.model';
import { ServiceService } from '../service.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { BusinessLocation } from '../../auth/auth.model';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss']
})
export class SearchServicesComponent implements OnInit, OnDestroy {


  // subscription
  private serviceSub: Subscription ;
  private categorySub: Subscription ;
  private searchedServiceSub: Subscription;
  private bookingSub: Subscription;
  private locationSub: Subscription;

  services: Service[] = [];

  bookings: Booking[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // filter-categories
  categories: ServiceCategories[] = [];


  // temp value for user ratings
  ratings = 0;

  // temp slider options
  priceStart = 0;
  priceEnd = 49999;

  // filter-drawe-state
  opened = false;

  // enable searching mode
  searching = false;

  // show product details
  success = false;

  // start date (today date)
  today = new Date();

  // selected category
  selectedCategory = 'Recently Booked';

  // recieved locations
  recievedLocations: {location: BusinessLocation, business: string}[]  = [];

  // pass to service car and service details comps
  dates = {fromDate: this.today.toISOString(), toDate: this.today.toISOString()};
  islogged = true; // must be updated with backend call

  // temp town suggessions for loction search FILTER-BUSINESS LOCATION
  towns = [
    'Matara', 'Colombo', 'Anuradhapura', 'Gampaha', 'Jaffana', 'Mannar', 'Mulativ',
  ];

  model: any;

  constructor(private breakpointObserver: BreakpointObserver,
              public serviceService: ServiceService) {}


  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  ngOnInit() {
    // get services list
    this.serviceService.getServices();
    this.serviceSub = this.serviceService.getservicesUpdateListener()
      .subscribe((recievedServices: Service[]) => {
          this.services = recievedServices;
          console.log(this.services);
  });

   // import categories
    this.serviceService.getCategories();
    this.categorySub = this.serviceService.getCategoriesUpdateListener()
     .subscribe((recievedData: ServiceCategories[]) => {
     this.categories = recievedData;
     console.log(this.categories);
 });

    this.serviceService.getLocations();
    this.locationSub = this.serviceService.getLocationsUpdateListener()
      .subscribe((recievedData: {location: BusinessLocation, business: string}[]) => {
      this.recievedLocations = recievedData;
      console.log(this.recievedLocations);
    });
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    if (this.searchedServiceSub) {
      this.searchedServiceSub.unsubscribe();
    }
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
    if (this.locationSub) {
      this.locationSub.unsubscribe();
    }
  }

  // location search auto complete
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.towns
        : this.towns.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  hasData() {
    if (this.services.length) {
      return true;
    } else {
      return false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  searchServices(filterForm: NgForm) {
    const searchQuery: ServiceQuery = {
      category: this.selectedCategory,
      minPrice: this.priceStart,
      maxPrice: this.priceEnd,
      payOnMeet: this.booleanValue(filterForm.value.pay_on_meet),
      userRating: this.ratings
    };
    console.log(searchQuery);
    this.serviceService.searchServices(searchQuery);
    this.searchedServiceSub = this.serviceService.getSearchedServiceUpdatedListener()
    .subscribe((recievedData: Service[]) => {
    this.services = recievedData;
    console.log(this.services);
   // this.changeSettings(this.dates.fromDate, this.dates.toDate);
    this.searching = !this.searching;
   });
  }

  booleanValue(value: any) {
    if (value ===  '' || value === null || value === undefined) {
      return false;
    } else {return value; }
  }

  sendService(service: Service) {
    this.success = this.serviceService.setService(service);
   }

   // get available list of services
  changeSettings(fromDate: string, toDate: string) {
    const tDate = new Date(toDate);
    const fDate = new Date(fromDate);
    const services: Service[] = this.serviceService.getUpdatedServices();
    const serviceIds: string[] = [];

    this.serviceService.getBookings();
    this.bookingSub = this.serviceService.getBookingsUpdateListener()
    .subscribe((recievedData: Booking[]) => {
      console.log(recievedData);
      for (const book of recievedData) {
        const bookfDate = new Date(book.from_date);
        const booktDate = new Date(book.to_date);
        console.log(tDate, fDate, bookfDate, booktDate);
        if (bookfDate >= fDate && booktDate <= tDate) {
          if (!serviceIds.includes(book.service_id)) {
            serviceIds.push(book.service_id);
          }
        }
      }
      console.log(serviceIds);
      for (const sid of serviceIds) {
        this.services.filter(s => s.service_id === sid);
      }
      console.log('final', this.services);
   });
  }

}
