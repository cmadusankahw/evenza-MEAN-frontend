import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { ProductService } from 'src/app/modules/product/product.service';


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


  private headerSubs: Subscription;

  // snack bars for notification display
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // recieved merchant
  headerDetails: { userType: string, userName: string, profilePic: string };

  // create new product
  editmode = true;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService,
              private _snackBar: MatSnackBar,
              private productService: ProductService) {

    // handeling booking created notification
    this.productService.newOrderCreated()
      .subscribe(data => {
        this._snackBar.open('New Order on ' + data.product
          + ' Placed! quantity:  ' + data.quantity, 'Dismiss', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  ngOnInit() {
    this.routerEvents();
    this.authService.getHeaderDetails();
    this.headerSubs = this.authService.getHeaderDetailsListener().subscribe(
      merchant => {
        this.headerDetails = merchant;
      });
  }

  ngOnDestroy() {
    if (this.headerSubs) {
      this.headerSubs.unsubscribe();
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
    this.home = this.orders = this.inventory = this.profile = this.reports = 'txt-white row';
  }

  navOrders() {
    this.orders = 'txt-white row active-nav';
    this.bprofile = this.home = this.inventory = this.profile = this.reports = 'txt-white row';
  }

  navInventory() {
    this.inventory = 'txt-white row active-nav';
    this.bprofile = this.orders = this.home = this.profile = this.reports = 'txt-white row';
  }

  navReports() {
    this.reports = 'txt-white row active-nav';
    this.bprofile = this.orders = this.inventory = this.home = this.profile = 'txt-white row';
  }

  navProfile() {
    this.profile = 'txt-white row active-nav';
    this.bprofile = this.orders = this.inventory = this.home = this.reports = 'txt-white row';
  }


}
