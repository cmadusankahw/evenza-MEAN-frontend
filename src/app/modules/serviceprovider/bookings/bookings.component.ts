import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking } from '../serviceprovider.model';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'service_name', 'booked_date', 'duration', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Create sample bookings
  bookings: Booking[];


  // booking-states
  @Input() bookingType = 'pending';

  // booking arrays
  recievedBookings = [];


  constructor() {

  }

  ngOnInit() {
    if (this.bookings) {
      this.dataSource = new MatTableDataSource(this.addBookings(this.bookings, this.bookingType));
      console.log(this.recievedBookings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

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


}
