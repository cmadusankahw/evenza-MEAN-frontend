import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import * as io from 'socket.io-client';

import { Order, DashStat, OrderStat, Earnings } from './seller.model';
import { Email } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { Product } from '../product/product.model';
import { OrderReport } from '../seller/seller.model';
import { MerchantPayments } from '../admin/admin.model';
import { getSocketUrl, getUrl } from 'src/assets/url';

@Injectable({ providedIn: 'root' })
export class SellerService {
  // subjects : Observer pattern
  private ordersUpdated = new Subject<Order[]>();
  private orderUpdated = new Subject<Order>();
  private productsUpdated = new Subject<Product[]>();
  private reportDataUpdated = new Subject<boolean>();
  private dashStatUpdated = new Subject<DashStat>();
  private earningsUpdated = new Subject<Earnings[]>();

  // report generation related subjects
  private orderReportUpdated = new Subject<OrderReport[]>();
  private paymentDetailsUpdated = new Subject<any>();
  private selIdUpdated = new Subject<string>();
  private selNamesUpdated = new Subject<any>();

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
  private dashStat: DashStat;
  // recieved seller ID
  private selId: string;
  // socket connection
  private socket = io(getSocketUrl());
  // api url
  private url = getUrl();

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  // getters

  // get list of orders of an event planner
  public getOrders() {
    this.http
      .get<{ message: string; orders: Order[] }>(this.url + 'seller/order/get')
      .subscribe((recievedOrders) => {
        this.orders = recievedOrders.orders;
        this.ordersUpdated.next([...this.orders]);
      });
  }

  // get single order
  public getOrder(orderId: string) {
    this.http
      .get<{ message: string; order: Order }>(
        this.url + 'seller/order/get/' + orderId
      )
      .subscribe((recievedOrder) => {
        this.order = recievedOrder.order;
        this.orderUpdated.next(this.order);
      });
  }

  // get data required for reports
  public getreportData() {
    this.http
      .get<{ message: string; orders: OrderStat[] }>(
        this.url + 'seller/stat/get'
      )
      .subscribe((recievedData) => {
        this.orderStat = recievedData.orders;
        this.reportDataUpdated.next(true);
      });
  }

  // get dashboard statistics
  public getDashStat() {
    // initial declaration
    const dashStat: DashStat = {
      pending_orders: 0,
      last_order_date: 'loading...',
      delivered_orders: 0,
      last_delivery_date: 'loading...',
      cancelled_orders: 0,
      last_cancelled_date: 'loading...',
      inventory: 0,
      lasT_modified_date: 'loading...',
    };

    // booking stat
    let c = 0;
    let d = 0;
    let a = 0;
    let b = 0;

    if (this.orderStat) {
      for (const order of this.orderStat) {
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
      if (this.orderStat[a].created_date) {
        dashStat.last_order_date = this.orderStat[a].created_date.slice(0, 10);
      }
      if (this.orderStat[c].created_date) {
        dashStat.last_cancelled_date = this.orderStat[c].created_date.slice(
          0,
          10
        );
      }
      if (this.orderStat[b].created_date) {
        dashStat.last_delivery_date = this.orderStat[b].created_date.slice(
          0,
          10
        );
      }
    }
    setTimeout(() => {
      this.dashStat = dashStat;
      this.dashStatUpdated.next(dashStat);
    }, 1000);
  }

  // generate earnings
  public getEarnings() {
    const earnings: Earnings[] = [];

    // loop through bookings
    if (this.orderStat) {
      for (const order of this.orderStat) {
        if (order.state !== 'cancelled') {
          const earning: Earnings = {
            order_id: order.order_id,
            product_id: order.product_id,
            product: order.product,
            earned_date: order.created_date.slice(0, 10),
            earned_time: order.created_date.slice(11, 16),
            payment_type: 'card',
            commission_due: (order.amount * 5) / 100,
            amount_paid: order.amount_paid,
            amount: order.amount,
          };
          earnings.push(earning);
        }
      }
    }
    setTimeout(() => {
      this.earnings = earnings;
      this.earningsUpdated.next(earnings);
    }, 1000);
  }

  // report generation related functions
  public getSellerNames() {
    this.http
      .get<{
        message: string;
        selnames: { product: string; product_id: string }[];
      }>(this.url + 'seller/selnames/get')
      .subscribe((res) => {
        this.selNamesUpdated.next(res.selnames);
      });
  }

  // get seller ID for report generation
  public getSelId() {
    this.http
      .get<{ id: string }>(this.url + 'seller/selid/get')
      .subscribe((res) => {
        this.selId = res.id;
        this.selIdUpdated.next(res.id);
      });
  }

  // get booking details for product order report
  public getProductOrderReport(fromDate: string, toDate: string) {
    this.http
      .post<{ message: string; orders: OrderReport[] }>(
        this.url + 'seller/reports/orders',
        { fromDate, toDate }
      )
      .subscribe((res) => {
        console.log(res.message);
        this.orderReportUpdated.next(res.orders);
      });
  }

  // get payments & earnings details for product order report
  public getPaymentEarningReport() {
    this.http
      .get<{ message: string; payments: MerchantPayments; earnings: any[] }>(
        this.url + 'seller/reports/payment'
      )
      .subscribe((res) => {
        console.log(res);
        this.paymentDetailsUpdated.next(res);
      });
  }

  // setters

  // change order stste id cancelled or marked as delivered
  public changeOrderState(orderState: { orderId: string; state: string }) {
    this.http
      .post<{ message: string; order: Order }>(
        this.url + 'seller/order/edit',
        orderState
      )
      .subscribe((recievedData) => {
        this.order = recievedData.order;
        this.orderUpdated.next(this.order);
        this.sendOrderState(
          orderState.orderId,
          recievedData.order.product,
          orderState.state
        );
        console.log(recievedData.message);
      });
  }

  // user profile change password
  public changeUserPassword(currentPword: string, newPword: string) {}

  // send emails
  public sendEmail(mail: Email) {
    this.http
      .post<{ message: string }>(this.url + 'seller/mail', mail)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }


  // listeners for subjects
  public getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  public getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  public getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  public getReportDataUpdateListener() {
    return this.reportDataUpdated.asObservable();
  }

  public getDashStatUpdateListener() {
    return this.dashStatUpdated.asObservable();
  }

  public getEarningsUpdateListener() {
    return this.earningsUpdated.asObservable();
  }

  // report genration related listeners

  public getSelNamesupdatedListener() {
    return this.selNamesUpdated.asObservable();
  }

  public getOrderreportUpdatedListener() {
    return this.orderReportUpdated.asObservable();
  }

  public getPaymentsDetailsUpdatedListener() {
    return this.paymentDetailsUpdated.asObservable();
  }

  public getSelIdUpdatedListener() {
    return this.selIdUpdated.asObservable();
  }

  // realtime notifications with socket.io

  // trigger order state change event realtime for interested listeners
  public onOrderStateChanged() {
    const observable = new Observable<{
      orderId: string;
      product: string;
      state: string;
    }>((observer) => {
      this.socket.on('order state', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // emit socket once a order state chnaged
  public sendOrderState(orderId: string, product: string, state: string) {
    this.socket.emit('order-state', { orderId, product, state });
  }

}
