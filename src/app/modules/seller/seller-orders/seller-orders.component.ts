import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '../seller.model';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product', 'date_ordered', 'quantity', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Create sample bookings
  orders: Order[] = [
    {
      order_id: 'B1',
      product_id: 'P1',
      user_id: 'U1',
      product: 'Setty Back',
      delivery_service: 'DHL',
      qty_type: 'Units',
      customer_name: 'Arjun',
      delivery_address: 'No 2 , Main St, Colombo',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'delivered',
      review: 'Nice Product!',
      quantity: 3.5,
      comment: 'please deliver on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      order_id: 'B2',
      product_id: 'P2',
      user_id: 'U1',
      product: 'Setty Back',
      delivery_service: 'DHL',
      qty_type: 'Units',
      customer_name: 'Arjun',
      delivery_address: 'No 2 , Main St, Colombo',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      review: 'Nice Product!',
      quantity: 3.5,
      comment: 'please deliver on time',
      payment_type: 'Visa',
      amount: 215.30,
      commission_due: 22.50,
      amount_paid: 30.0
    },
    {
      order_id: 'B3',
      product_id: 'P3',
      user_id: 'U1',
      product: 'Setty Back',
      delivery_service: 'DHL',
      qty_type: 'Units',
      customer_name: 'Arjun',
      delivery_address: 'No 2 , Main St, Colombo',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'cancelled',
      review: 'Nice Product!',
      quantity: 3.5,
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

}
