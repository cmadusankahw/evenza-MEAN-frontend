import { Component, OnInit,ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking, BusinessStat, Earnings } from '../serviceprovider.model';
import { ServiceProviderService } from '../serviceprovider.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'service_booked', 'earned_date_time', 'amount', 'action', 'amt'];
  dataSource: MatTableDataSource<Earnings>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private bookingSub: Subscription;

  // recieved bookings
  earninigs: Earnings[];


  constructor(private serviceProviderService: ServiceProviderService) {}

  ngOnInit() {
    this.serviceProviderService.getEarnings();
    this.bookingSub = this.serviceProviderService.getEarningstUpdatedListener()
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



}
