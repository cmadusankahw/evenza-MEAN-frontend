import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order, DeliveryService } from '../eventplanner.model';

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
  orders: Order[] = [
    {
      order_id: 'O1',
      product_id: 'P1',
      user_id: 'U1',
      product: 'Setty Back',
      delivery_address: ' No 112, Main St, Matara',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'delivered',
      review: 'Nice Product!',
      quantity: 3.5,
      qty_type: 'Units',
      delivery_service: 'DHL',
      comment: 'please deliver on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      order_id: 'O2',
      product_id: 'P2',
      user_id: 'U1',
      product: 'Setty Back',
      delivery_address: ' No 112, Main St, Matara',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      review: 'Nice Product!',
      quantity: 3.5,
      qty_type: 'Units',
      delivery_service: 'DHL',
      comment: 'please deliver on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      order_id: 'O3',
      product_id: 'P3',
      user_id: 'U1',
      product: 'Setty Back',
      delivery_address: ' No 112, Main St, Matara',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      review: 'Nice Product!',
      quantity: 3.5,
      qty_type: 'Units',
      delivery_service: 'DHL',
      comment: 'please deliver on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },

  ];



  // order types
  @Input() orderType = 'pending';

  // recieved orders
  recievedOrders = [];

  recievedDeliveryService: DeliveryService;

  // rate and review
  rateReview = false;

  // add review mode
  addReview = false;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.addOrders(this.orders, this.orderType ));
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

  showOrderDetails(orderId: string) {
    if (this.orderType !== 'cancelled') {
      this.getDeliveryService(null); // this shoud retrive relavant delivery service
    }
  }

  getDeliveryService(dsId: string) {

      // function to get delivery service details here
      this.recievedDeliveryService = {
        delivery_service: 'D-01',
        title: 'DHL',
        address: 'Main Street, Colombo 07',
        hotline: '713456678',
        delivery_rate: 300.00,
        min_delivery_time: 1,
        max_delivery_time: 3

      };
  }

  submitReview(orderId: string, review: string) {
    // submit review code here
  }


}
