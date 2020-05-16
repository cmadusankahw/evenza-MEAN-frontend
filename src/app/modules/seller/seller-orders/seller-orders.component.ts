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
      order_id: 'B-01',
      product_id: 'S-01',
      product: 'Setty Back',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'delivered',
      rating: 3,
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
      order_id: 'B-01',
      product_id: 'S-01',
      product: 'Setty Back',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      rating: 3,
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
      order_id: 'B-01',
      product_id: 'S-01',
      product: 'Setty Back',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'pending',
      rating: 3,
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
