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
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private orderSub: Subscription;

  // recieved bookings
  recievedOrders: Order[];

  // output values to parent comp
  @Output() amountsEmit = new EventEmitter<object>();

  // total values
  totalAmountPaid = 0;
  totalCommissionDue = 0;
  totalEarning = 0;



  constructor(private sellerService : SellerService) {}

  ngOnInit() {
    this.sellerService.getOrders();
    this.orderSub = this.sellerService.getOrdersUpdateListener()
          .subscribe((recievedOrders: Order[]) => {
              this.recievedOrders = recievedOrders;
              console.log(this.recievedOrders);
              if (this.recievedOrders) {
                this.dataSource = new MatTableDataSource(this.recievedOrders);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
              for (const book of recievedOrders) {
                this.totalAmountPaid += book.amount_paid;
                this.totalCommissionDue += book.commission_due;
                this.totalEarning += book.amount;
              }
              this.updateAmounts();
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

   // send business verify details
   updateAmounts() {
    this.amountsEmit.emit({
      totalCommisionDue: this.totalCommissionDue,
      totalEarning: this.totalEarning,
    });
  }


}
