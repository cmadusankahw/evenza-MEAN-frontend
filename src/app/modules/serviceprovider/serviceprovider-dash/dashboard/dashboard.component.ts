import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  showSubMenu = false;
  home = true;
  bProfile: boolean;
  booking: boolean;
  appointment: boolean;
  calendar: boolean;
  report: boolean;
  profile: boolean;

  private authSubs: Subscription;


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
  }


  ngOnDestroy() {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
  }


  routerEvents() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/sp/dash') {
          this.onHome();
        } else if (e.url === '/sp/dash/bprofile') {
          this.onBprofile();
        } else if (e.url === '/sp/dash/bookings') {
          this.onBooking();
        } else if (e.url === '/sp/dash/appoints') {
          this.onAppointment();
        } else if (e.url === '/sp/dash/calendar') {
          this.onCalendar();
        } else if (e.url === '/sp/dash/reports') {
          this.onReport();
        } else if (e.url === '/sp/dash/profile') {
          this.onProfile();
        }
      }
    });
  }

  onHome() {
    this.home = true;
    this.bProfile = false;
    this.booking = false;
    this.appointment = false;
    this.calendar = false;
    this.report = false;
    this.profile = false;

  }


  onBprofile() {
    this.home = false;
    this.bProfile = true;
    this.booking = false;
    this.appointment = false;
    this.calendar = false;
    this.report = false;
    this.profile = false;

  }


  onBooking() {
    this.home = false;
    this.bProfile = false;
    this.booking = true;
    this.appointment = false;
    this.calendar = false;
    this.report = false;
    this.profile = false;

  }


  onAppointment() {
    this.home = false;
    this.bProfile = false;
    this.booking = false;
    this.appointment = true;
    this.calendar = false;
    this.report = false;
    this.profile = false;

  }


  onCalendar() {
    this.home = false;
    this.bProfile = false;
    this.booking = false;
    this.appointment = false;
    this.calendar = true;
    this.report = false;
    this.profile = false;

  }


  onReport() {
    this.home = false;
    this.bProfile = false;
    this.booking = false;
    this.appointment = false;
    this.calendar = false;
    this.report = true;
    this.profile = false;

  }


  onProfile() {
    this.home = false;
    this.bProfile = false;
    this.booking = false;
    this.appointment = false;
    this.calendar = false;
    this.report = false;
    this.profile = true;

  }



}
