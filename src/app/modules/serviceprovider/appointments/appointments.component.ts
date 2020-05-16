import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Appointment } from '../serviceprovider.model';

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
      appoint_id: 'A-01',
      service_id: 'S-01',
      service_name: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      appointed_date: '30/03/2020',
      appointed_time: '08:00',
      comment: 'please be on time',
    },
    {
      appoint_id: 'A-02',
      service_id: 'S-02',
      service_name: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'cancelled',
      appointed_date: '30/03/2020',
      appointed_time: '08:00',
      comment: 'please be on time',
    },
    {
      appoint_id: 'A-03',
      service_id: 'S-03',
      service_name: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'confirmed',
      appointed_date: '30/03/2020',
      appointed_time: '08:00',
      comment: 'please be on time',
    },

  ];


  // booking-states
  @Input() appointmentType = 'pending';

  // booking arrays
  recievedAppointments = [];


  constructor() {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.addAppointments(this.appointments, this.appointmentType));
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



}
