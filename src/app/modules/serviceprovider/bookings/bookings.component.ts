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
      booking_id: 'B1',
      service_id: 'S1',
      user_id: 'U1',
      event_id: 'E1',
      service_name: 'Manjula Photography',
      event_name: 'Wedding',
      customer_name: 'Arjun',
      customer_email: 'abcd@sample.com',
      customer_contact : '712345678',
      created_date: '22/03/2020',
      created_time: '14:25',
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
      booking_id: 'B2',
      service_id: 'S2',
      user_id: 'U2',
      event_id: 'E1',
      service_name: 'Manjula Photography',
      event_name: 'Wedding',
      customer_name: 'Arjun',
      customer_email: 'abcd@sample.com',
      customer_contact : '712345678',
      created_date: '22/03/2020',
      created_time: '14:25',
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
      booking_id: 'B3',
      service_id: 'S3',
      user_id: 'U3',
      event_id: 'E1',
      service_name: 'Manjula Photography',
      event_name: 'Wedding',
      customer_name: 'Arjun',
      customer_email: 'abcd@sample.com',
      customer_contact : '712345678',
      created_date: '22/03/2020',
      created_time: '14:25',
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

  showBookingDetails(bookingId: string) {
  }


}
