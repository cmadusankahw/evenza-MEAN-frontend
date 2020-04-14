import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface Order {
  order_id: string;
  product_id: string;
  cust_id: string;
  product: string;
  product_category: string;
  customer_name: string;
  created_date: string;
  created_time: string;
  state: string;
  rating: number;
  review: string;
  quantity: number;
  qty_type: string;
  delivery_service: string;
  comment: string;
  payment_type: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
}

export interface OrderState {
  id: string;
  val: string;
}

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
      cust_id: 'C-01',
      product: 'Setty Back',
      product_category: 'Wedding Eq',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Delivered',
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
      cust_id: 'C-01',
      product: 'Setty Back',
      product_category: 'Wedding Eq',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Pending',
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
      cust_id: 'C-01',
      product: 'Setty Back',
      product_category: 'Wedding Eq',
      customer_name: 'Arjun',
      created_date: '22/03/2020',
      created_time: '14:25',
      state: 'Pending',
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

  status: OrderState[] = [
    { id: '1', val: 'Delivered' },
    { id: '2', val: 'Pending' },
    { id: '3', val: 'Cancelled' },
  ];

  //booking-states
  @Input() orderType = 1;

  //booking arrays
  recievedOrders = [];



  constructor() { }

  ngOnInit() {
    this.initorderType();
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

  initorderType() {
    if (this.orderType === 1) {
      this.dataSource = new MatTableDataSource(this.onPending(this.orders));
    } else if (this.orderType === 2) {
      this.dataSource = new MatTableDataSource(this.onApproved(this.orders));
    } else if (this.orderType === 3) {
      this.dataSource = new MatTableDataSource(this.onCancelled(this.orders));
    }
  }

  onPending(orders: any) {
    const pendingOrders = [];
    for (const val of orders) {
      //console.log(val);
      if (val.state === 'Pending') {
        pendingOrders.push(Object.assign({}, val));
      }
    }
    this.recievedOrders = [...pendingOrders];
    return this.recievedOrders;
  }

  onApproved(orders: any) {
    const deliveredOrders = [];
    for (const val of orders) {
      //console.log(val);
      if (val.state === 'Delivered') {
        deliveredOrders.push(Object.assign({}, val));
      }
    }
    this.recievedOrders = [...deliveredOrders];
    return this.recievedOrders;
  }

  onCancelled(orders: any) {
    const cancelledOrders = [];
    for (const val of orders) {
      //console.log(val);
      if (val.state === 'Cancelled') {
        cancelledOrders.push(Object.assign({}, val));
      }
    }
    this.recievedOrders = [...cancelledOrders];
    return this.recievedOrders;
  }


  hasData() {
    if (this.recievedOrders.length) {
      return true;
    } else {
      return false;
    }
  }



}
