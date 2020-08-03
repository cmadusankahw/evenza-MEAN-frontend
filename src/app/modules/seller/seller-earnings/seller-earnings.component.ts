import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Earnings, Order } from '../seller.model';
import { Subscription } from 'rxjs';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller-earnings',
  templateUrl: './seller-earnings.component.html',
  styleUrls: ['./seller-earnings.component.scss']
})
export class SellerEarningsComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['id', 'service_booked', 'earned_date_time', 'amount', 'action', 'amt'];
  dataSource: MatTableDataSource<Earnings>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private orderSub: Subscription;

  // recieved bookings
  earninigs: Earnings[];

  // total values
  totalAmountPaid = 0;
  totalCommissionDue = 0;
  totalEarning = 0;
  noOfBookings = 0;


  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.getEarnings();
    this.orderSub = this.sellerService.getEarningsUpdateListener()
          .subscribe((res: Earnings[]) => {
              if (res) {
                this.earninigs = res;
                this.dataSource = new MatTableDataSource(this.earninigs);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
      });
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
