import { Component, OnInit,ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking } from '../serviceprovider.model';
import { ServiceProviderService } from '../serviceprovider.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'service_booked', 'earned_date_time', 'amount', 'action', 'amt'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private bookingSub: Subscription;

  // recieved bookings
  recievedBookings: Booking[] = [];

  // output values to parent comp
  @Output() amountsEmit = new EventEmitter<object>();

  // total values
  totalAmountPaid = 0;
  totalCommissionDue = 0;
  totalEarning = 0;
  noOfBookings = 0;

  constructor(private serviceProviderService: ServiceProviderService) {}

  ngOnInit() {
    this.serviceProviderService.getBookings();
    this.bookingSub = this.serviceProviderService.getBookingsUpdateListener()
          .subscribe((recievedBookings: Booking[]) => {
              for (const book of recievedBookings) {
                if (book.state === 'pending' || book.state === 'completed') {
                  this.recievedBookings.push(book);
                  this.totalAmountPaid += book.amount_paid;
                  this.totalCommissionDue += book.commission_due;
                  this.totalEarning += book.amount;
                  this.noOfBookings++;
                }
              }
              console.log(this.recievedBookings);
              if (this.recievedBookings) {
                this.dataSource = new MatTableDataSource(this.recievedBookings);
                console.log(this.dataSource);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
              this.updateAmounts();
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // send business verify details
  updateAmounts() {
    this.amountsEmit.emit({
      totalCommisionDue: this.totalCommissionDue,
      totalEarning: this.totalEarning,
      no_of_bookings: this.noOfBookings
    });
  }



}
