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
  bookings: Booking[] ;

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
