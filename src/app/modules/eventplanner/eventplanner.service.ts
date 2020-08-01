import { OnDestroy, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Socket } from 'ngx-socket-io';

import { Booking, Appointment, Email, Order } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { Message } from './message';



@Injectable({ providedIn: 'root' })
export class EventPlannerService {


  private bookingsUpdated = new Subject<Booking[]>();
  private ordersUpdated = new Subject<Order[]>();
  private appointmentsUpdated = new Subject<Appointment[]>();

  private bookingUpdated = new Subject<Booking>();
  private orderUpdated = new Subject<Order>();
  private appointmentUpdated = new Subject<Appointment>();

  private bookings: Booking[];

  private appointments: Appointment[];

  private orders: Order[];

  // recieved single booking
  private booking: Booking;

  // recieved single order
  private order: Order;

  // recieved single appointment
  private appointment: Appointment;

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';

    constructor(private router: Router,
                public dialog: MatDialog,
                private http: HttpClient,
                private socket: Socket) {}


    // send emails
    sendEmail(mail: Email) {
      this.http.post<{ message: string }>(this.url + 'planner/mail', mail)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
    });
    }

    // submit a review on booking
    submitReview(id: string, review: string, type: string) {
      const newReview = {msg: review};
      if (type === 'booking') {
        this.http.post<{ message: string, review: string }>(this.url + 'planner/booking/review/' + id, newReview)
        .subscribe((recievedData) => {
          console.log(recievedData.review);
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
       });
      } else if (type === 'order') {
        this.http.post<{ message: string, review: string }>(this.url + 'planner/order/review/' + id, newReview)
        .subscribe((recievedData) => {
          console.log(recievedData.review);
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
       });
      }

    }


   // get methods

   // get list of bookings of an event planner
    getBookings() {
    this.http.get<{ message: string, bookings: Booking[] }>(this.url + 'planner/booking/get')
      .subscribe((recievedBookings) => {
        this.bookings = recievedBookings.bookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
    }

    // get list of orders of an event planner
    getOrders() {
      this.http.get<{ message: string, orders: Order[] }>(this.url + 'planner/order/get')
      .subscribe((recievedOrders) => {
        this.orders = recievedOrders.orders;
        this.ordersUpdated.next([...this.orders]);
      });
    }

    // get list of appointments of an event planner
    getAppointments() {
      this.http.get<{ message: string, appointments: Appointment[] }>(this.url + 'planner/appoint/get')
      .subscribe((recievedAppointments) => {
        this.appointments = recievedAppointments.appointments;
        this.appointmentsUpdated.next([...this.appointments]);
      });
    }



    // get single booking
    getBooking(bookingId: string ) {
      this.http.get<{ message: string, booking: Booking }>(this.url + 'planner/booking/get/' + bookingId )
      .subscribe((recievedBooking) => {
        this.booking = recievedBooking.booking;
        this.bookingUpdated.next(this.booking);
      });
    }


    // get single appointment
    getAppointment(appointId: string) {
      this.http.get<{ message: string, appointment: Appointment }>(this.url + 'planner/appoint/get/' + appointId)
      .subscribe((recievedAppointment) => {
        this.appointment = recievedAppointment.appointment;
        this.appointmentUpdated.next(this.appointment);
      });
    }

    // get single order
    getOrder(orderId: string) {
      this.http.get<{ message: string, order: Order }>(this.url + 'planner/order/get/' + orderId)
      .subscribe((recievedOrder) => {
        this.order = recievedOrder.order;
        this.orderUpdated.next(this.order);
      });
    }

    // listners for subjects
    getBookingsUpdateListener() {
      return this.bookingsUpdated.asObservable();
    }

    getOrdersUpdateListener() {
      return this.ordersUpdated.asObservable();
    }

    getAppointmentsUpdateListener() {
      return this.appointmentsUpdated.asObservable();
    }

    getBookingUpdatedListener() {
      return this.bookingUpdated.asObservable();
    }

    getOrderUpdatedListender() {
      return this.orderUpdated.asObservable();
    }

    getAppointmentUpdatedListener() {
      return this.appointmentUpdated.asObservable();
    }

    // socket based chat message handeling
    public sendMessage(message) {
      this.socket.emit('new-message', message);
    }

    // socket based chat message recoeving
    public getMessages = () => {
      return Observable.create((observer) => {
              this.socket.on('new-message', (message) => {
                  observer.next(message.message);
              });
      });
  }

}
