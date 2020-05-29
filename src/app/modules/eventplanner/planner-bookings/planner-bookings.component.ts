import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking } from '../eventplanner.model';

@Component({
  selector: 'app-planner-bookings',
  templateUrl: './planner-bookings.component.html',
  styleUrls: ['./planner-bookings.component.scss']
})
export class PlannerBookingsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'service_name', 'booked_date', 'duration', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Create sample bookings
  bookings: Booking[] = [
    {
      booking_id: 'B1',
      service_id: 'S1',
      user_id: 'U1',
      event_id: 'E1',
      service_name: 'Manjula Photography',
      event_name: 'Sample Wedding',
      created_date: '22/03/2020',
      state: 'pending',
      review: 'Good Service!',
      from_date: '20/3/2020',
      to_date: '22/03/2020',
      duration: 2,
      from_time: '08:00',
      to_time: '16:00',
      comment: 'please be on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      booking_id: 'B-02',
      service_id: 'S-02',
      user_id: 'U2',
      event_id: 'E2',
      service_name: 'Manjula Photography',
      event_name: 'hackX 2019',
      created_date: '22/03/2020',
      state: 'pending',
      review: 'Good Service!',
      from_date: '20/3/2020',
      to_date: '22/03/2020',
      duration: 2,
      from_time: '08:00',
      to_time: '16:00',
      comment: 'please be on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    }, {
      booking_id: 'B3',
      service_id: 'S3',
      user_id:'U3',
      event_id: 'E1',
      service_name: 'Manjula Photography',
      event_name: 'Sample Wedding',
      created_date: '22/03/2020',
      state: 'cancelled',
      review: 'Good Service!',
      from_date: '20/3/2020',
      to_date: '22/03/2020',
      duration: 2,
      from_time: '08:00',
      to_time: '16:00',
      comment: 'please be on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
  ];

  // booking-states
  @Input() bookingType = 'pending';

  // booking arrays
  recievedBookings = [];

  // rate and review
  rateReview = false;

  // add review mode
  addReview = false;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.addBookings(this.bookings, this.bookingType));
    console.log(this.recievedBookings);
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

  addBookings(bookings: Booking[], state: string) {
    const pendingBookings = [];
    for (const val of bookings) {
      if (val.state === state) {
        pendingBookings.push(Object.assign({}, val));
      }
    }
    this.recievedBookings = [...pendingBookings];
    return this.recievedBookings;
  }

  showBookingDetails(bookingId: string) {
  }

  submitReview(bookingId: string, review: string) {
    // submit review code here
  }

}
