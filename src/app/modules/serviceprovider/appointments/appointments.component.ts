import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Appointment } from '../serviceprovider.model';
import { ServiceProviderService } from '../serviceprovider.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Email } from '../../eventplanner/eventplanner.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'service_name',  'appointed_date', 'duration', 'customer_name', 'action'];
  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subjects
  private appointSub: Subscription;

  // booking-states
  @Input() appointmentType = 'pending';

  // Create sample bookings
  appointments: Appointment[];

  // booking arrays
  recievedAppointments: Appointment[] = [];

  // selected appointment
  selectedAppointment: Appointment;

  // cancel message
  cancelMsg: string;


  constructor(private serviceProviderService: ServiceProviderService,
              private router: Router) {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.serviceProviderService.getAppointments();
    this.appointSub = this.serviceProviderService.getAppointmentsUpdateListener()
          .subscribe((recievedAppoints: Appointment[]) => {
              this.appointments = recievedAppoints;
              console.log(this.appointments);
              if (this.appointments) {
              this.dataSource = new MatTableDataSource(this.addAppointments(this.appointments, this.appointmentType));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
           }
      });
  }

  ngOnDestroy() {
    if (this.appointSub) {
      this.appointSub.unsubscribe();
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 // classify appointments into diiferent categories
  addAppointments(appoints: Appointment[], state: string) {
    const pedingAppoints = [];
    for (const val of appoints) {
      if (val.state === state) {
        pedingAppoints.push(Object.assign({}, val));
      }
    }
    this.recievedAppointments = [...pedingAppoints];
    return this.recievedAppointments;
  }


   // get selected booking details
   showAppointmentDetails(appointId: string) {
    for (const app of this.appointments) {
      if (app.appoint_id   === appointId) {
        this.selectedAppointment = app;
      }
    }
  }


   // cancel a booking
   sendCancelMail() {
    const cancelledMessage = document.getElementById('content').innerHTML;
    console.log(cancelledMessage);
    const mail: Email = {
      email: this.selectedAppointment.user.email,
      subject: 'Your Appointment: (ID:' + this.selectedAppointment.appoint_id + ') on '
      + this.selectedAppointment.service_name + ' is Cancelled',
      html:  '<u><b>Notice:</b></u> ' + cancelledMessage + '<p>' +
      this.cancelMsg +
      '</p> <br> <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.serviceProviderService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }

   // cancel a booking
   sendConfirmMail() {
    const mail: Email = {
      email: this.selectedAppointment.user.email,
      subject: 'Your Appointment: (ID:' + this.selectedAppointment.appoint_id + ') on '
      + this.selectedAppointment.service_name + ' is Approved',
      html:  'Your Appointment: (ID:' + this.selectedAppointment.appoint_id + ') on '
             + this.selectedAppointment.service_name + ' is Approved <br> ' + ' <h5><b> Appointment on   :</b> '
             + this.selectedAppointment.service_name + '</h5>' +
             ' <h5><b> Appointment Date :</b> ' + this.selectedAppointment.appointed_date.slice(0, 10) + '</h5>' +
             ' <h5><b> Appointment Time :</b> ' + (this.selectedAppointment.appointed_time.hour > 9 ? ''
             + this.selectedAppointment.appointed_time.hour : '0' +this.selectedAppointment.appointed_time.hour)
             + (this.selectedAppointment.appointed_time.minute > 9 ? '' + this.selectedAppointment.appointed_time.minute : '0' +
             this.selectedAppointment.appointed_time.minute) + '</h5>' +
      ' <br> <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.serviceProviderService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }

  // change appointment state to completed
  changeAppointmntState(appointId: string, state: string) {
    const appointStatte = {
      appointId,
      state
    };
    this.serviceProviderService.changeAppointmentState(appointStatte);
    if (state === 'cancelled') {
      this.sendCancelMail();
    }
    if (state === 'confirmed') {
      this.sendConfirmMail();
    }
    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/sp/dash/appoints']);
    }, 1000);
   }


}
