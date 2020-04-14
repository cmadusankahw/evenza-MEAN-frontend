import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Booking {
  booking_id: string;
  service_id: string;
  cust_id: string;
  service_name: string;
  service_category: string;
  customer_name: string;
  created_date: string;
  created_time: string;
  state: string;
  rating: number;
  review: string;
  booking_type: string;
  booked_date: string;
  duration: number;
  start_time: string;
  end_time: string;
  comment: string;
  payment_type: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
}

export interface BookingState {
  id: string;
  val: string;
}


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
      cust_id: 'C-01',
      service_name: 'Manjula Photography',
      service_category: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Pending',
      rating: 3,
      review: 'Good Service!',
      booked_date: '30/03/2020',
      booking_type: '/Hr',
      duration: 4.5,
      start_time: '08:00',
      end_time: '16:00',
      comment: 'please be on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      booking_id: 'B-02',
      service_id: 'S-01',
      cust_id: 'C-01',
      service_name: 'Arjun Photography',
      service_category: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Pending',
      rating: 3,
      review: 'Good Service!',
      booked_date: '30/03/2020',
      booking_type: '/Hr',
      duration: 4.5,
      start_time: '08:00',
      end_time: '16:00',
      comment: 'please be on time',
      payment_type: 'Pay on Meet',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      booking_id: 'B-03',
      service_id: 'S-01',
      cust_id: 'C-01',
      service_name: 'ABC Photography',
      service_category: 'Photography',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Cancelled',
      rating: 3,
      review: 'Good Service!',
      booked_date: '30/03/2020',
      booking_type: '/Hr',
      duration: 4.5,
      start_time: '08:00',
      end_time: '16:00',
      comment: 'please be on time',
      payment_type: 'PayHere',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },

  ];

  status: BookingState[] = [
    { id: '1', val: 'Approved' },
    { id: '2', val: 'Pending' },
    { id: '3', val: 'Cancelled' },
  ];

  //booking-states
  @Input() bookingType = 1;

  //booking arrays
  recievedBookings = [];


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
    if (this.bookingType === 1) {
      this.dataSource = new MatTableDataSource(this.onPending(this.bookings));
    } else if (this.bookingType === 2) {
      this.dataSource = new MatTableDataSource(this.onApproved(this.bookings));
    } else if (this.bookingType === 3) {
      this.dataSource = new MatTableDataSource(this.onCancelled(this.bookings));
    }
  }

  onPending(bookings: any) {
    const pendingBookings = [];
    for (const val of bookings) {
      //console.log(val);
      if (val.state === 'Pending') {
        pendingBookings.push(Object.assign({}, val));
      }
    }
    this.recievedBookings = [...pendingBookings];
    return this.recievedBookings;
  }

  onApproved(bookings: any) {
    const approvedBookings = [];
    for (const val of bookings) {
      //console.log(val);
      if (val.state === 'Approved') {
        approvedBookings.push(Object.assign({}, val));
      }
    }
    this.recievedBookings = [...approvedBookings];
    return this.recievedBookings;
  }

  onCancelled(bookings: any) {
    const cancelledBookings = [];
    for (const val of bookings) {
      //console.log(val);
      if (val.state === 'Cancelled') {
        cancelledBookings.push(Object.assign({}, val));
      }
    }
    this.recievedBookings = [...cancelledBookings];
    return this.recievedBookings;
  }

  hasData() {
    if (this.recievedBookings.length) {
      return true;
    } else {
      return false;
    }
  }


}
