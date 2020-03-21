import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showSubMenu = false;
  home = true;
  bProfile = false;
  booking = false;
  appointment = false;
  calendar = false;
  report = false;
  profile = false;

  //create new service
  editmode = true;
  addnew = true;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

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
