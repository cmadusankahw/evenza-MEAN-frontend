import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '../eventplanner.model';
import { EventPlannerService } from '../eventplanner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planner-orders',
  templateUrl: './planner-orders.component.html',
  styleUrls: ['./planner-orders.component.scss']
})
export class PlannerOrdersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'product', 'date_ordered', 'quantity', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscriptions
  private orderSub: Subscription;

  // order types
   @Input() orderType = 'pending';

  // Create sample bookings
  orders: Order[];

  // recieved orders
  recievedOrders: Order[] = [];

  // selected order
  selectedOrder: Order;

  // rate and review
  rateReview = false;

  // add review mode
  addReview = false;

  constructor(private eventPlannerService: EventPlannerService) { }

  ngOnInit() {
    this.eventPlannerService.getOrders();
    this.orderSub = this.eventPlannerService.getOrdersUpdateListener()
          .subscribe((recievedOrders: Order[]) => {
              this.orders = recievedOrders;
              console.log(this.orders);
              if (this.orders) {
              this.dataSource = new MatTableDataSource(this.addOrders(this.orders, this.orderType));
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

 // classify orders into their categories
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

  // get selected order details
  showOrderDetails(orderId: string) {
    for (const app of this.orders) {
      if (app.order_id === orderId) {
        this.selectedOrder = app;
      }
    }
  }

  // submit a review for an order
  submitReview(bookingId: string, review: string) {
    this.eventPlannerService.submitReview(bookingId, review, 'booking');
  }

}
