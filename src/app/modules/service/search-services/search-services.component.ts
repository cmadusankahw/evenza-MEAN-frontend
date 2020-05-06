import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, merge } from 'rxjs';
import { map, shareReplay, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';



import {Service, ServiceCategories } from '../service.model';
import { ServiceService } from '../service.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss']
})
export class SearchServicesComponent implements OnInit, OnDestroy {


  // subscription
  private serviceSub: Subscription ;
  private categorySub: Subscription ;


  // this is serached product list
  searchedServices: Service[] = [];

  services: Service[] = [];


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
  }

  ngOnDestroy(){
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
    if (this.categorySub){
      this.categorySub.unsubscribe();
    }
  }

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

  searchServices() {
    this.searching = !this.searching;
  }


}
