import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Order, DashStat, OrderStat, Earnings } from './seller.model';
import { Email } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { Product } from '../product/product.model';

@Injectable({providedIn: 'root'})
export class SellerService {

  // subject
  private ordersUpdated = new Subject<Order[]>();
  private orderUpdated = new Subject<Order>();
  private productsUpdated = new Subject<Product[]>();
  private reportDataUpdated = new Subject<boolean>();
  private dashStatUpdated = new Subject<DashStat>();
  private earningsUpdated = new Subject<Earnings[]>();

  // recieved orders
  private orders: Order[];
  // recieved single order
  private order: Order;
  // recieved products
  private products: Product[];
  // recieved earnings
  private earnings: Earnings[] = [];
  // order stats
  private orderStat: OrderStat[] = [];
  // retrived dashboard stats
  dashStat: DashStat;

  url = 'http://localhost:3000/api/';


  constructor(private http: HttpClient,
              private router: Router,
              private dialog: MatDialog ) {}


  // change order stste
  changeOrderState(orderState: {orderId: string, state: string}) {
    this.http.post<{ message: string, order: Order }>(this.url + 'seller/order/edit' , orderState)
      .subscribe((recievedData) => {
        this.order = recievedData.order;
        this.orderUpdated.next(this.order);
        console.log(recievedData.message);
      });
  }

  // user profile change password
  changeUserPassword(currentPword: string, newPword: string) {
  }

  // send emails
  sendEmail(mail: Email) {
    this.http.post<{ message: string }>(this.url + 'seller/mail', mail)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

  // get methods

  // get list of orders of an event planner
   getOrders() {
    this.http.get<{ message: string, orders: Order[] }>(this.url + 'seller/order/get')
    .subscribe((recievedOrders) => {
      this.orders = recievedOrders.orders;
      this.ordersUpdated.next([...this.orders]);
    });
  }

    // get single order
    getOrder(orderId: string) {
      this.http.get<{ message: string, order: Order }>(this.url + 'seller/order/get/' + orderId)
      .subscribe((recievedOrder) => {
        this.order = recievedOrder.order;
        this.orderUpdated.next(this.order);
      });
    }

    // get data required for reports
    getreportData() {
      this.http.get<{ message: string, orders: OrderStat[] }>(this.url + 'seller/stat/get')
      .subscribe((recievedData) => {
        this.orderStat = recievedData.orders;
        this.reportDataUpdated.next(true);
      });
    }

    // get dashboard statistics
    getDashStat() {
      // initial declaration
    var dashStat: DashStat = {
      pending_orders:  0,
      last_order_date: 'loading...',
      delivered_orders: 0,
      last_delivery_date: 'loading...',
      cancelled_orders: 0,
      last_cancelled_date: 'loading...',
      inventory: 0,
      lasT_modified_date: 'loading...',
    };

    // booking stat
    var c = 0;
    var d = 0;
    var a = 0;
    var b = 0;

    if (this.orderStat) {
      for (let order of this.orderStat) {
        if (order.state === 'pending') {
          dashStat.pending_orders++;
          a = d;
        }
        if (order.state === 'delivered') {
          dashStat.delivered_orders++;
          b = d;
        }
        if (order.state === 'cancelled') {
          dashStat.cancelled_orders++;
          c = d;
        }
        d++;
      }
      dashStat.last_order_date =  this.orderStat[a].created_date.slice(0,10);
      dashStat.last_cancelled_date =  this.orderStat[c].created_date.slice(0,10);
      dashStat.last_delivery_date =  this.orderStat[b].created_date.slice(0,10);
    }
    setTimeout ( () => {
      this.dashStat = dashStat;
      this.dashStatUpdated.next(dashStat);
    }, 1000);
    }

    // generate earnings
    getEarnings() {
      var earnings: Earnings[] = [];

      // loop through bookings
      if (this.orderStat) {
        for (let order of this.orderStat) {
          const earning: Earnings = {
            order_id: order.order_id,
            product_id: order.product_id,
            product: order.product,
            earned_date: order.created_date.slice(0,10),
            earned_time: order.created_date.slice(11,16),
            payment_type: 'card',
            commission_due: (order.amount* 5)/ 100,
            amount_paid: order.amount_paid,
            amount: order.amount
          };
          earnings.push(earning);
        }
      }
      setTimeout ( () => {
        this.earnings = earnings;
        this.earningsUpdated.next(earnings);
      }, 1000);
    }


  // listeners for subjects
  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getReportDataUpdateListener() {
    return this.reportDataUpdated.asObservable();
  }

  getDashStatUpdateListener() {
    return this.dashStatUpdated.asObservable();
  }

  getEarningsUpdateListener() {
    return this.earningsUpdated.asObservable();
  }


}
