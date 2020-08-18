import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, merge } from 'rxjs';
import { map, shareReplay, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';



import { Service, ServiceCategories, EventServiceQuery, Booking } from '../../service/service.model';
import { ServiceService } from '../../service/service.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { BusinessLocation } from '../../auth/auth.model';
import { Filteration } from '../../event/event.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-service-search',
  templateUrl: './event-service-search.component.html',
  styleUrls: ['./event-service-search.component.scss']
})
export class EventServiceSearchComponent implements OnInit, OnDestroy {


  // subscription
  private serviceSub: Subscription;
  private categorySub: Subscription;
  private searchedServiceSub: Subscription;
  private bookingSub: Subscription;
  private locationSub: Subscription;

  // recieved services
  public services: Service[] = [];
  // recieved service categories
  public categories: ServiceCategories[] = [];
  // retrived from emitting
  public eventId: string;
  public filter: Filteration;
  // filter-drawe-state
  public opened = false;
  // enable searching mode
  public searching = false;
  // show product details
  public success = false;
  // start date (today date)
  public today = new Date();
  public islogged = true; // must be updated with backend call
  // recieved locations !!!!!!!!!!! edit
  public recievedLocations: { location: BusinessLocation, business: string }[] = [];


  // tsearch query
  ratings = 0;
  priceStart = 0;
  priceEnd = 199999;
  priceEndStatic = 199999;
  payOnMeetQuery = true;
  selectedCategory = 'all';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  // temp town suggessions for loction search FILTER-BUSINESS LOCATION
  towns = [
    'Matara', 'Colombo', 'Anuradhapura', 'Gampaha', 'Jaffana', 'Mannar', 'Mulativ',
  ];
  model: any;

  constructor(private breakpointObserver: BreakpointObserver,
              public serviceService: ServiceService,
              private eventService: EventService) { }


  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  ngOnInit() {
    // get emitted filters
    this.eventId = this.eventService.getSelectedEvent(); // for an overall search
    // get relavant emitted filters
    this.filter = this.eventService.getSelectedFilteration();
    if (this.filter) {
          this.eventId = this.filter.eventId; // for a specific filtered search
          this.selectedCategory = this.filter.category;
          this.priceEnd = this.filter.allocated_budget;
          this.priceEndStatic = this.filter.allocated_budget;
          this.searchServices();
          console.log(this.services);
    }
    // get serviceproviders' locations
    this.serviceService.getLocations();
    this.locationSub = this.serviceService.getLocationsUpdateListener()
      .subscribe((recievedData: { location: BusinessLocation, business: string }[]) => {
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  // search services
  searchServices() {
    const searchQuery: EventServiceQuery = {
      category: this.selectedCategory,
      minPrice: this.priceStart,
      maxPrice: this.priceEnd,
      payOnMeet: this.payOnMeetQuery,
      userRating: this.ratings,
    };
    console.log(searchQuery);
    this.serviceService.searchEventServices(searchQuery);
    this.searchedServiceSub = this.serviceService.getSearchedEventServiceUpdatedListener()
      .subscribe((recievedData: Service[]) => {
        this.services = recievedData;
      });
  }


  // set service to view details
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
