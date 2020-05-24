import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

import { Merchant } from 'src/app/modules/seller/seller.model';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit, OnDestroy {

  showSubMenu = false;
   // navigation
   home = 'txt-white row';
   bprofile = 'txt-white row';
   orders = 'txt-white row';
   inventory = 'txt-white row';
   reports = 'txt-white row';
   profile = 'txt-white row';


  private merchantSubs: Subscription;

  // recieved merchant
  merchant: Merchant;

    // create new product
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
        } else if (e.url === '/sp/dash/orders') {
          this.navOrders();
        } else if (e.url === '/sp/dash/inventory') {
          this.navInventory();
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
    this.bprofile = this.orders = this.inventory = this.profile = this.reports = 'txt-white row';
  }

  navBprofile() {
    this.bprofile = 'txt-white row active-nav';
    this.home = this.orders = this.inventory  = this.profile = this.reports = 'txt-white row';
  }

  navOrders() {
    this.orders = 'txt-white row active-nav';
    this.bprofile = this.home = this.inventory  = this.profile = this.reports = 'txt-white row';
  }

  navInventory() {
    this.inventory = 'txt-white row active-nav';
    this.bprofile = this.orders = this.home  = this.profile = this.reports = 'txt-white row';
  }

  navReports() {
    this.reports = 'txt-white row active-nav';
    this.bprofile = this.orders = this.inventory = this.home = this.profile  = 'txt-white row';
  }

  navProfile() {
    this.profile = 'txt-white row active-nav';
    this.bprofile = this.orders = this.inventory  = this.home = this.reports = 'txt-white row';
  }


}
