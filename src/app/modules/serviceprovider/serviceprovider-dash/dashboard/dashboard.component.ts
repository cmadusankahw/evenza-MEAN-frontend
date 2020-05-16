import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

import { Merchant } from 'src/app/modules/serviceprovider/serviceprovider.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  showSubMenu = false;
   // navigation
   home = 'txt-white row';
   bprofile = 'txt-white row';
   bookings = 'txt-white row';
   appoints = 'txt-white row';
   calendar = 'txt-white row';
   reports = 'txt-white row';
   profile = 'txt-white row';


  private authSubs: Subscription;

  private merchantSubs: Subscription;

  // recieved merchant
  merchant: Merchant;


  // create new service
  editmode = true;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.routerEvents();
    this.authService.getMerchant();
    this.merchantSubs = this.authService.getMerchantUpdateListener().subscribe (
      merchant => {
          this.merchant = merchant;
      });
  }


  ngOnDestroy() {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
    if (this.merchantSubs) {
      this.merchantSubs.unsubscribe();
    }
  }


  routerEvents() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/sp/dash') {
          this.navHome();
        } else if (e.url === '/sp/dash/bprofile') {
          this.navBprofile();
        } else if (e.url === '/sp/dash/bookings') {
          this.navBookings();
        } else if (e.url === '/sp/dash/appoints') {
          this.navAppoints();
        } else if (e.url === '/sp/dash/calendar') {
          this.navCalendar();
        } else if (e.url === '/sp/dash/reports') {
          this.navReports();
        } else if (e.url === '/sp/dash/profile') {
        this.navProfile();
    }
    }
  });
  }

  navHome() {
    this.home = 'txt-white row active-nav';
    this.bprofile = this.bookings = this.appoints = this.calendar = this.profile = this.reports = 'txt-white row';
  }

  navBprofile() {
    this.bprofile = 'txt-white row active-nav';
    this.home = this.bookings = this.appoints = this.calendar = this.profile = this.reports = 'txt-white row';
  }

  navBookings() {
    this.bookings = 'txt-white row active-nav';
    this.bprofile = this.home = this.appoints = this.calendar = this.profile = this.reports = 'txt-white row';
  }

  navAppoints() {
    this.appoints = 'txt-white row active-nav';
    this.bprofile = this.bookings = this.home = this.calendar = this.profile = this.reports = 'txt-white row';
  }

  navCalendar() {
    this.calendar = 'txt-white row active-nav';
    this.bprofile = this.bookings = this.appoints = this.home = this.profile = this.reports = 'txt-white row';
  }

  navReports() {
    this.reports = 'txt-white row active-nav';
    this.bprofile = this.bookings = this.appoints = this.home = this.profile = this.calendar = 'txt-white row';
  }

  navProfile() {
    this.profile = 'txt-white row active-nav';
    this.bprofile = this.bookings = this.appoints = this.calendar = this.home = this.reports = 'txt-white row';
  }



}
