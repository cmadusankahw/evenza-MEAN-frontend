import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Booking {
  id: string;
  service_id: string;
  cust_id: string;
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
  amount: number;
  commission_due: number;
  amount_paid: number;
}

export interface BookingState{
  id: string;
  val: string;
}


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'color', 'action'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

 // Create sample bookings
 bookings: Booking[] = [
  { 
    id: 'B-01',
    service_id: 'S-01',
    cust_id: 'C-01',
    created_date: '22/03/2020',
    created_time: '14:25',
    state: 'Approved',
    rating: 3,
    review : 'Good Service!',
    booked_date: '30/03/2020',
    booking_type: '/Hr',
    duration: 4.5,
    start_time: '08:00',
    end_time: '16:00',
    comment: 'please be on time',
    amount: 215.30,
    commission_due: 22.50,
    amount_paid: 30.0
   },

];

status: BookingState[] = [
  {id: '1', val: 'Approved'},
  {id: '1', val: 'Pending'},
  {id: '1', val: 'Paid'},
]


  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.bookings);
  }

  ngOnInit() {
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

}
