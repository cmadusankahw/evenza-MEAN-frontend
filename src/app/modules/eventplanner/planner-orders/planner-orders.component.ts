import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '../eventplanner.model';

@Component({
  selector: 'app-planner-orders',
  templateUrl: './planner-orders.component.html',
  styleUrls: ['./planner-orders.component.scss']
})
export class PlannerOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product', 'date_ordered', 'quantity', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Create sample bookings
  orders: Order[];

  // order types
  @Input() orderType = 'pending';

  // recieved orders
  recievedOrders = [];

  // rate and review
  rateReview = false;

  // add review mode
  addReview = false;

  constructor() { }

  ngOnInit() {
    if (this.orders) {
      this.dataSource = new MatTableDataSource(this.addOrders(this.orders, this.orderType ));
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


  addOrders(orders: Order[], state: string) {
    const pendingOrders = [];
    for (const val of orders) {
      if (val.state === state) {
        pendingOrders.push(Object.assign({}, val));
      }
    }
    this.recievedOrders = [...pendingOrders];
    return this.recievedOrders;
  }


  submitReview(orderId: string, review: string) {
    // submit review code here
  }


}
