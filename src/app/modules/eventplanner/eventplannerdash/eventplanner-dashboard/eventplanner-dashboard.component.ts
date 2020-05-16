import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { EventPlanner } from '../../eventplanner.model';
import { AuthService } from '../../../auth/auth.service';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-eventplanner-dashboard',
  templateUrl: './eventplanner-dashboard.component.html',
  styleUrls: ['./eventplanner-dashboard.component.scss']
})
export class EventplannerDashboardComponent implements OnInit, OnDestroy {

   // subscription
   private eventPlannerSub: Subscription ;

   // recieved Event Planner
   eventPlanner: EventPlanner;

   // navigation
   home = 'txt-white row';
   events = 'txt-white row';
   bookings = 'txt-white row';
   appoints = 'txt-white row';
   orders = 'txt-white row';
   profile = 'txt-white row';


   // side nav controller
   opened = false;



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );



  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.routerEvents();

    this.authService.getEventPlanner();
    this.eventPlannerSub = this.authService.getEventPlannerUpdateListener().subscribe (
      ePlanner => {
          this.eventPlanner = ePlanner;
      });
  }

  ngOnDestroy(){
    if (this.eventPlannerSub) {
      this.eventPlannerSub.unsubscribe();
    }
  }

  routerEvents() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/planner') {
          this.navHome();
        } else if (e.url === '/planner/events') {
          this.navEvents();
        } else if (e.url === '/planner/bookings') {
          this.navBookings();
        } else if (e.url === '/planner/appoints') {
          this.navAppoints();
        } else if (e.url === '/planner/orders') {
          this.navOrders();
        } else if (e.url === '/planner/profile') {
          this.navProfile();
      }
    }
  });
  }

  navHome() {
    this.home = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.orders = this.profile = 'txt-white row';
  }

  navEvents(){
    this.events = 'txt-white row active-nav';
    this.home = this.bookings = this.appoints = this.orders = this.profile = 'txt-white row';
  }

  navBookings(){
    this.bookings = 'txt-white row active-nav';
    this.events = this.home = this.appoints = this.orders = this.profile = 'txt-white row';
  }

  navAppoints(){
    this.appoints = 'txt-white row active-nav';
    this.events = this.bookings = this.home = this.orders = this.profile = 'txt-white row';
  }

  navOrders(){
    this.orders = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.home = this.profile = 'txt-white row';
  }

  navProfile(){
    this.profile = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.orders = this.home = 'txt-white row';
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }




}
