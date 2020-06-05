import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Order } from './seller.model';
import { Email } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';

@Injectable({providedIn: 'root'})
export class SellerService {

  // subject
  private ordersUpdated = new Subject<Order[]>();
  private orderUpdated = new Subject<Order>();

  // recieved orders
  private orders: Order[];

  // recieved single order
  private order: Order;

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


  // listeners for subjects
  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }


}
