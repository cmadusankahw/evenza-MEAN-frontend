import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { EventPlanner } from '../../eventplanner.model';
import { AuthService } from '../../../auth/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { ServiceProviderService } from 'src/app/modules/serviceprovider/serviceprovider.service';
import { SellerService } from 'src/app/modules/seller/seller.service';


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
   reports = 'txt-white row';


   // side nav controller
   opened = false;

       // snack bars for notification display
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );



  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService,
              private serviceProviderservice: ServiceProviderService,
              private sellerService: SellerService,
              private _snackBar: MatSnackBar) {

                // hadeling booking state changed notification
                 this.serviceProviderservice.onBookingStateChanged()
                 .subscribe( data => {
                   this._snackBar.open('Booking ' + data.bookingId
                   + ' on ' + data.service
                   + ' was ' + data.state, 'Dismiss', {
                   duration: 5000,
                   horizontalPosition: this.horizontalPosition,
                   verticalPosition: this.verticalPosition,
                   });
                 });

                  // hadeling apointment state changed notification
                 this.serviceProviderservice.onAppointmentStateChanged()
                  .subscribe( data => {
                    this._snackBar.open('Appointment ' + data.appointId
                    + ' on ' + data.service
                    + ' was ' + data.state, 'Dismiss', {
                    duration: 5000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    });
                  });

                     // hadeling apointment state changed notification
                 this.sellerService.onOrderStateChanged()
                 .subscribe( data => {
                   this._snackBar.open('Order ' + data.orderId
                   + ' on ' + data.product
                   + ' was ' + data.state, 'Dismiss', {
                   duration: 5000,
                   horizontalPosition: this.horizontalPosition,
                   verticalPosition: this.verticalPosition,
                   });
                 });
              }

  ngOnInit() {
    this.routerEvents();

    this.authService.getEventPlanner();
    this.eventPlannerSub = this.authService.getEventPlannerUpdateListener().subscribe (
      ePlanner => {
          this.eventPlanner = ePlanner;
      });
  }

  ngOnDestroy() {
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
        }  else if (e.url === '/planner/reports') {
          this.navReports();
      }
    }
  });
  }

  navHome() {
    this.home = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.orders = this.profile  = this.reports = 'txt-white row';
  }

  navEvents() {
    this.events = 'txt-white row active-nav';
    this.home = this.bookings = this.appoints = this.orders = this.profile  = this.reports = 'txt-white row';
  }

  navBookings() {
    this.bookings = 'txt-white row active-nav';
    this.events = this.home = this.appoints = this.orders = this.profile  = this.reports = 'txt-white row';
  }

  navAppoints() {
    this.appoints = 'txt-white row active-nav';
    this.events = this.bookings = this.home = this.orders = this.profile  = this.reports = 'txt-white row';
  }

  navOrders() {
    this.orders = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.home = this.profile  = this.reports ='txt-white row';
  }

  navProfile() {
    this.profile = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.orders = this.home = this.reports = 'txt-white row';
  }

  navReports() {
    this.reports = 'txt-white row active-nav';
    this.events = this.bookings = this.appoints = this.orders = this.home = this.profile =  'txt-white row';
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }




}
