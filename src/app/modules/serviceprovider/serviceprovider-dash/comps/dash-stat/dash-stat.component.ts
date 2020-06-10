import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { DashStat, Appointment } from '../../../serviceprovider.model';
import { ServiceProviderService } from '../../../serviceprovider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash-stat',
  templateUrl: './dash-stat.component.html',
  styleUrls: ['./dash-stat.component.scss']
})
export class DashStatComponent implements OnInit, OnDestroy {

  // subscribers
  private dashStatSub: Subscription;

  appoints: Appointment[];


  @Output() datesEmit = new EventEmitter<any>();

  appMonths = {jan:0, feb: 0 ,mar:0, apr: 0, may:0, jun: 0, jul: 0, aug:0 ,sep:0, oct:0, nov:0, dec:0};

  @Input() bookingCounts = { pendingBookings: 0, completedBooking: 0, pendingBookingDate: '', completedBookingDate: ''};

  appointCounts = { pendingAppoints: 0, completedAppoints: 0, pendingAppointDate: '', completedAppointDate: ''};

  constructor(private serviceProviderService: ServiceProviderService ) { }

  ngOnInit() {
   this.serviceProviderService.getAppointments();
   this.dashStatSub = this.serviceProviderService.getAppointmentsUpdateListener()
          .subscribe((recievedData: Appointment[]) => {
            this.appoints = recievedData;
            console.log(this.appoints);
            if (this.appoints) {
              this.updateCount(this.appoints);
           }
      });
  }

  ngOnDestroy(){
    if (this.dashStatSub) {
      this.dashStatSub.unsubscribe();
    }
  }

 updateCount(apps: Appointment[]){
  for (const app of apps) {
    const month = app.appointed_date.slice(5, 7) ;
    if (app.state === 'pending'){
      this.appointCounts.pendingAppoints++;
      this.appointCounts.pendingAppointDate = app.created_date.slice(0, 10);
    }
    if (app.state === 'confirmed'){
      this.appointCounts.completedAppoints++;
      this.appointCounts.completedAppointDate = app.created_date.slice(0, 10);
    }
    if ( month === '01') {
      this.appMonths.jan++;
    } else if ( month === '02') {
      this.appMonths.feb++;
    } else if ( month === '03') {
      this.appMonths.mar++;
    } else if ( month === '04') {
      this.appMonths.apr++;
    } else if ( month === '05') {
      this.appMonths.may++;
    } else if ( month === '06') {
      this.appMonths.jun++;
    } else if ( month === '07') {
      this.appMonths.jul++;
    } else if ( month === '08') {
      this.appMonths.aug++;
    } else if ( month === '09') {
      this.appMonths.sep++;
    } else if ( month === '10') {
      this.appMonths.oct++;
    } else if ( month === '11') {
      this.appMonths.nov++;
    } else if ( month === '12') {
      this.appMonths.dec++;
    }
    console.log(this.bookingCounts);
    console.log(this.appMonths);
  }
  setTimeout( () => {
    this.setDatesEmit();
  }, 1000);
}

setDatesEmit() {
  this.datesEmit.emit(this.appMonths);
}

}
