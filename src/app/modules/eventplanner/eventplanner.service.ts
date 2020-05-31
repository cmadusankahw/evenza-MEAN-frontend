import { OnDestroy, Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { Booking, Appointment } from '../eventplanner/eventplanner.model';
import { Order } from '../product/product.model';
import { SuccessComponent } from 'src/app/success/success.component';




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
                private http: HttpClient) {}


    // change booking stste
    changeBookingState(bookingState: {bookingId: string, state: string}) {
      this.http.post<{ message: string, booking: Booking }>(this.url + 'planner/booking/edit/', bookingState)
        .subscribe((recievedData) => {
          this.booking = recievedData.booking;
          this.bookingUpdated.next(this.booking);
          console.log(recievedData.message);
        });
    }

    // change appointment stste
    changeAppointmentState(appointState: {appointId: string, state: string}) {
      this.http.post<{ message: string, appointment: Appointment }>(this.url + 'planner/appoint/edit/', appointState)
        .subscribe((recievedData) => {
          this.appointment = recievedData.appointment;
          this.appointmentUpdated.next(this.appointment);
          console.log(recievedData.message);
        });
    }

    // change order stste
    changeOrderState(orderState: {orderId: string, state: string}) {
      this.http.post<{ message: string, order: Order }>(this.url + 'planner/order/edit/', orderState)
        .subscribe((recievedData) => {
          this.order = recievedData.order;
          this.orderUpdated.next(this.order);
          console.log(recievedData.message);
        });
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
      this.http.get<{ message: string, appoitments: Appointment[] }>(this.url + 'planner/appoint/get')
      .subscribe((recievedAppointments) => {
        this.appointments = recievedAppointments.appoitments;
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

}
