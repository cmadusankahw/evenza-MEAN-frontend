import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Admin } from 'src/app/modules/auth/auth.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  // subscription
  private adminSub: Subscription;

  // navigation
  home = 'txt-white row';
  payments = 'txt-white row';
  users = 'txt-white row';
  verify = 'txt-white row';
  categories = 'txt-white row';
  profile = 'txt-white row';
  reports = 'txt-white row';


  private headerSubs: Subscription;

  // recieved merchant
  headerDetails: {userType: string, userName: string, profilePic: string};

   // create new product
   editmode = true;

   // recieved admin
    admin: Admin;

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
   .pipe(
     map(result => result.matches),
     shareReplay()
   );

 constructor(private breakpointObserver: BreakpointObserver,
             private router: Router, private authService: AuthService) { }

 ngOnInit() {


   this.routerEvents();
   this.authService.getHeaderDetails();
   this.headerSubs = this.authService.getHeaderDetailsListener().subscribe (
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
       if (e.url === '/admin') {
         this.navHome();
       } else if (e.url === '/admin/payments') {
         this.navPayments();
       } else if (e.url === '/admin/users') {
         this.navUsers();
       } else if (e.url === '/admin/verify') {
         this.navVerify();
       } else if (e.url === '/admin/categories') {
         this.navCategories();
       } else if (e.url === '/admin/reports') {
        this.navReports();
      }else if (e.url === '/admin/profile') {
       this.navProfile();
   }
   }
 });
 }

 navHome() {
   this.home = 'txt-white row active-nav';
   this.payments = this.users = this.verify = this.profile = this.categories = this.reports = 'txt-white row';
 }

 navPayments() {
   this.payments = 'txt-white row active-nav';
   this.home = this.users = this.verify  = this.profile = this.categories = this.reports = 'txt-white row';
 }

 navUsers() {
   this.users = 'txt-white row active-nav';
   this.payments = this.home = this.verify  = this.profile = this.categories = this.reports = 'txt-white row';
 }

 navVerify() {
   this.verify = 'txt-white row active-nav';
   this.payments = this.users = this.home  = this.profile = this.categories = this.reports = 'txt-white row';
 }

 navCategories() {
   this.categories = 'txt-white row active-nav';
   this.payments = this.users = this.verify = this.home = this.profile  =this.reports = 'txt-white row';
 }


 navReports() {
  this.reports = 'txt-white row active-nav';
  this.payments = this.users = this.verify = this.home = this.profile  = 'txt-white row';
}

 navProfile() {
   this.profile = 'txt-white row active-nav';
   this.payments = this.users = this.verify  = this.home = this.categories = this.reports = 'txt-white row';
 }

}
