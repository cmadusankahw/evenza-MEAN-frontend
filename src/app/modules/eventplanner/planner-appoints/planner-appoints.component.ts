import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Appointment, Email } from '../eventplanner.model';
import { EventPlannerService } from '../eventplanner.service';


@Component({
  selector: 'app-planner-appoints',
  templateUrl: './planner-appoints.component.html',
  styleUrls: ['./planner-appoints.component.scss']
})
export class PlannerAppointsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'service_name',  'appointed_date', 'appointed_time', 'state', 'action'];
  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscrition listeners
  private appointmentsSub: Subscription;

  // Create sample bookings
  private appointments: Appointment[] ;

  // booking-states
  @Input() appointmentType = 'pending';

  // booking arrays
  recievedAppointments = [];

  // sellected appointment
  selectedAppointment: Appointment;

  // cancel message
  cancelMsg: string;


  constructor(private eventPlannerService: EventPlannerService) { }

  ngOnInit() {
    this.eventPlannerService.getAppointments();
    this.appointmentsSub = this.eventPlannerService.getAppointmentsUpdateListener()
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.appointmentsSub){
      this.appointmentsSub.unsubscribe();
    }
  }

  // classify recieved appointments
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

  // get selected appointment details
  showAppointmentDetails(appointId: string) {
    for (const app of this.appointments) {
      if (app.appoint_id === appointId) {
        this.selectedAppointment = app;
      }
    }
  }

  // send a cancel request
  sendCacelRequest() {
    const cancelledMessage = document.getElementById('content').innerHTML;
    console.log(cancelledMessage);
    const mail: Email = {
      email: this.selectedAppointment.serviceProvider.email,
      subject: 'Cancel Request for Appointment: (ID:' + this.selectedAppointment.appoint_id + ')',
      html: cancelledMessage + '<p>' + this.cancelMsg + '</p> <br> <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.eventPlannerService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }



}
