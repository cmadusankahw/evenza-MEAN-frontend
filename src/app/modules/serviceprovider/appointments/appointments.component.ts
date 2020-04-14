import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Appointment, AppointmentState } from '../serviceprovider.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'service_name',  'appointed_date', 'duration', 'customer_name', 'action'];
  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Create sample bookings
  appointments: Appointment[] = [
    {
      id: 'A-01',
      service_id: 'S-01',
      cust_id: 'C-01',
      service_name: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Approved',
      appointed_date: '30/03/2020',
      pref_from_time: '08:00',
      pref_to_time: '16:00',
      comment: 'please be on time',
    },
    {
      id: 'A-02',
      service_id: 'S-01',
      cust_id: 'C-01',
      service_name: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Pending',
      appointed_date: '30/03/2020',
      pref_from_time: '08:00',
      pref_to_time: '16:00',
      comment: 'please be on time',
    },
    {
      id: 'A-03',
      service_id: 'S-01',
      cust_id: 'C-01',
      service_name: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Approved',
      appointed_date: '30/03/2020',
      pref_from_time: '08:00',
      pref_to_time: '16:00',
      comment: 'please be on time',
    },

  ];

  status: AppointmentState[] = [
    { id: '1', val: 'Approved' },
    { id: '2', val: 'Pending' },
    { id: '3', val: 'Cancelled' },
  ];

  //booking-states
  @Input() appointmentType = 1;

  //booking arrays
  recievedAppointments = [];


  constructor() {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.initBookingType();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initBookingType() {
    if (this.appointmentType === 1) {
      this.dataSource = new MatTableDataSource(this.onPending(this.appointments));
    } else if (this.appointmentType === 2) {
      this.dataSource = new MatTableDataSource(this.onApproved(this.appointments));
    } else if (this.appointmentType === 3) {
      this.dataSource = new MatTableDataSource(this.onCancelled(this.appointments));
    }
  }

  onPending(bookings: any) {
    const pedingBookings = [];
    for (const val of bookings) {
      //console.log(val);
      if (val.state === 'Pending') {
        pedingBookings.push(Object.assign({}, val));
      }
    }
    this.recievedAppointments = [...pedingBookings];
    return this.recievedAppointments;
  }

  onApproved(bookings: any) {
    const approvedBookings = [];
    for (const val of bookings) {
      //console.log(val);
      if (val.state === 'Approved') {
        approvedBookings.push(Object.assign({}, val));
      }
    }
    this.recievedAppointments = [...approvedBookings];
    return this.recievedAppointments;
  }

  onCancelled(bookings: any) {
    const cancelledBookings = [];
    for (const val of bookings) {
      //console.log(val);
      if (val.state === 'Cancelled') {
        cancelledBookings.push(Object.assign({}, val));
      }
    }
    this.recievedAppointments = [...cancelledBookings];
    return this.recievedAppointments;
  }

  hasData() {
    if (this.recievedAppointments.length) {
      return true;
    } else {
      return false;
    }
  }


}
