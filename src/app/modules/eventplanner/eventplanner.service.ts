import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import * as io from 'socket.io-client';

import {
  Booking,
  Appointment,
  Email,
  Order,
  Inquery,
} from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { getSocketUrl, getUrl } from 'src/assets/url';

@Injectable({ providedIn: 'root' })
export class EventPlannerService {
  // observer pattern : Listeners for subjects
  private bookingsUpdated = new Subject<Booking[]>();
  private ordersUpdated = new Subject<Order[]>();
  private appointmentsUpdated = new Subject<Appointment[]>();

  private bookingUpdated = new Subject<Booking>();
  private orderUpdated = new Subject<Order>();
  private appointmentUpdated = new Subject<Appointment>();
  private inqueriesupdated = new Subject<Inquery[]>();
  private idupdated = new Subject<string>();

  // recieved bookings
  private bookings: Booking[];
  // recievd appointment
  private appointments: Appointment[];
  // recieved orders
  private orders: Order[];
  // recieved single booking
  private booking: Booking;
  // recieved single order
  private order: Order;
  // recieved single appointment
  private appointment: Appointment;
  // relatime chat users
  private chatUser: string;
  // recieved inqueries
  private inqueries: Inquery[] = [];
  // recieved event planner id
  private id: string;
  // socket connection
  private socket = io(getSocketUrl());
  // api url
  private url = getUrl();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  // getters

  // get seller ID for report generation
  public getId() {
    this.http
      .get<{ id: string }>(this.url + 'planner/get/id')
      .subscribe((res) => {
        this.id = res.id;
        this.idupdated.next(res.id);
      });
  }

  // get list of bookings of an event planner
  public getBookings() {
    this.http
      .get<{ message: string; bookings: Booking[] }>(
        this.url + 'planner/booking/get'
      )
      .subscribe((recievedBookings) => {
        this.bookings = recievedBookings.bookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
  }

  // get list of orders of an event planner
  public getOrders() {
    this.http
      .get<{ message: string; orders: Order[] }>(this.url + 'planner/order/get')
      .subscribe((recievedOrders) => {
        this.orders = recievedOrders.orders;
        this.ordersUpdated.next([...this.orders]);
      });
  }

  // get list of appointments of an event planner
  public getAppointments() {
    this.http
      .get<{ message: string; appointments: Appointment[] }>(
        this.url + 'planner/appoint/get'
      )
      .subscribe((recievedAppointments) => {
        this.appointments = recievedAppointments.appointments;
        this.appointmentsUpdated.next([...this.appointments]);
      });
  }

  // get list of appointments of an event planner
  public getInqueries() {
    this.http
      .get<{ message: string; inqueries: Inquery[] }>(
        this.url + 'planner/inquery/get'
      )
      .subscribe((resData) => {
        this.inqueries = resData.inqueries;
        this.inqueriesupdated.next([...this.inqueries]);
      });
  }

  // get single booking
  public getBooking(bookingId: string) {
    this.http
      .get<{ message: string; booking: Booking }>(
        this.url + 'planner/booking/get/' + bookingId
      )
      .subscribe((recievedBooking) => {
        this.booking = recievedBooking.booking;
        this.bookingUpdated.next(this.booking);
      });
  }

  // get single appointment
  public getAppointment(appointId: string) {
    this.http
      .get<{ message: string; appointment: Appointment }>(
        this.url + 'planner/appoint/get/' + appointId
      )
      .subscribe((recievedAppointment) => {
        this.appointment = recievedAppointment.appointment;
        this.appointmentUpdated.next(this.appointment);
      });
  }

  // get single order
  public getOrder(orderId: string) {
    this.http
      .get<{ message: string; order: Order }>(
        this.url + 'planner/order/get/' + orderId
      )
      .subscribe((recievedOrder) => {
        this.order = recievedOrder.order;
        this.orderUpdated.next(this.order);
      });
  }

  // setters

  // submit a review on booking
  public submitReview(id: string, review: string, type: string) {
    const newReview = { msg: review };
    if (type === 'booking') {
      this.http
        .post<{ message: string; review: string }>(
          this.url + 'planner/booking/review/' + id,
          newReview
        )
        .subscribe((recievedData) => {
          console.log(recievedData.review);
          this.dialog.open(SuccessComponent, {
            data: { message: recievedData.message },
          });
        });
    } else if (type === 'order') {
      this.http
        .post<{ message: string; review: string }>(
          this.url + 'planner/order/review/' + id,
          newReview
        )
        .subscribe((recievedData) => {
          console.log(recievedData.review);
          this.dialog.open(SuccessComponent, {
            data: { message: recievedData.message },
          });
        });
    }
  }

  // create an inquery
  public createInquery(inq: Inquery) {
    this.http
      .post<{ message: string }>(this.url + 'planner/inquery/create', inq)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/inquery']);
      });
  }

  // remove an inquery
  public removeInquery(inqId: string) {}

  // send emails
  public sendEmail(mail: Email) {
    this.http
      .post<{ message: string }>(this.url + 'planner/mail', mail)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // Observer Pattern : listners for subjects
  public getBookingsUpdateListener() {
    return this.bookingsUpdated.asObservable();
  }

  public getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  public getAppointmentsUpdateListener() {
    return this.appointmentsUpdated.asObservable();
  }

  public getBookingUpdatedListener() {
    return this.bookingUpdated.asObservable();
  }

  public getOrderUpdatedListender() {
    return this.orderUpdated.asObservable();
  }

  public getAppointmentUpdatedListener() {
    return this.appointmentUpdated.asObservable();
  }

  public getInqueriesUpdatedListener() {
    return this.inqueriesupdated.asObservable();
  }

  public getIdUpdatedListener() {
    return this.idupdated.asObservable();
  }

  // socket based realtime chat message handeling

  // get User detils
  public getUser() {
    return this.chatUser;
  }

  // set user to the chat room
  public setUser(type: string) {
    this.chatUser = type;
  }

  // Join a user to the chat room
  public joinRoom(data) {
    this.socket.emit('join', data);
  }

  // event trigers when a new user is joined to the chat room
  public newUserJoined() {
    const observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new user joined', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  // User leaving a chat room
  public leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  // event trigers when a user has left the chatroom
  public userLeftRoom() {
    const observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('left room', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  // Sending message
  public sendMessage(data) {
    this.socket.emit('message', data);
  }

  // Display chat messages list updated, when a new message is recieved
  public newMessageReceived() {
    const observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
}
