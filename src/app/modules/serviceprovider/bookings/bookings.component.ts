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
  bookings: Booking[] = [
    {
      booking_id: 'B-01',
      service_id: 'S-01',
      event_id: null,
      service_name: 'Manjula Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      rating: 3,
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
      event_id: null,
      service_name: 'Manjula Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      rating: 1,
      review: 'Good Service!',
      from_date: '20/03/2020',
      to_date: '20/03/2020',
      duration: 1,
      from_time: '08:00',
      to_time: '16:00',
      comment: 'please be on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    }, {
      booking_id: 'B-03',
      service_id: 'S-03',
      event_id: null,
      service_name: 'Manjula Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'cancelled',
      rating: 3,
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


  constructor() {

  }

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


}
