import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Booking, Appointment, DashStat, PayStat, CalendarBooking } from './serviceprovider.model';
import { Email } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({providedIn: 'root'})
export class ServiceProviderService {

  // api url
  url = 'http://localhost:3000/api/';

  // subjects
  private bookingsUpdated = new Subject<Booking[]>();
  private appointmentsUpdated = new Subject<Appointment[]>();
  private calendarBookingsUpdated = new Subject<CalendarBooking[]>();

  private bookingUpdated = new Subject<Booking>();
  private appointmentUpdated = new Subject<Appointment>();
  private dashStatUpdated = new Subject<DashStat>();
  private payStatUpdated = new Subject<PayStat>();

  // recieved bookings
  private bookings: Booking[];

  // recieved appointments
  private appointments: Appointment[];

  // recieved calendar bookings
  private calendarBookings: CalendarBooking[] = [];

   // recieved single booking
   private booking: Booking;

   // recieved single appointment
  private appointment: Appointment;

  // dashboard stat
  private dashstat: DashStat;

  // payment stat
  private paystat: PayStat;


  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog) {}


  // change booking stste
  changeBookingState(bookingState: {bookingId: string, state: string}) {
    this.http.post<{ message: string, booking: Booking }>(this.url + 'sp/booking/edit' , bookingState)
      .subscribe((recievedData) => {
        this.booking = recievedData.booking;
        this.bookingUpdated.next(this.booking);
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
      });
  }

  // change appointment stste
  changeAppointmentState(appointState: {appointId: string, state: string}) {
    this.http.post<{ message: string, appointment: Appointment }>(this.url + 'sp/appoint/edit', appointState)
      .subscribe((recievedData) => {
        this.appointment = recievedData.appointment;
        this.appointmentUpdated.next(this.appointment);
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
      });
  }


   // send emails
   sendEmail(mail: Email) {
    this.http.post<{ message: string }>(this.url + 'sp/mail', mail)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

  // get methods

  // get list of bookings of an event planner
  getCalendarBookings() {
    this.http.get<{ message: string, bookings: Booking[] }>(this.url + 'sp/calbooking/get')
      .subscribe((recievedBookings) => {
        for (const book of recievedBookings.bookings) {
          this.calendarBookings.push({ title: book.event_name, start: book.from_date, end: book.to_date});
        }
        this.calendarBookingsUpdated.next([...this.calendarBookings]);
      });
    }

   // get list of bookings of an event planner
   getBookings() {
    this.http.get<{ message: string, bookings: Booking[] }>(this.url + 'sp/booking/get')
      .subscribe((recievedBookings) => {
        this.bookings = recievedBookings.bookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
    }

   // get list of appointments of an event planner
   getAppointments() {
    this.http.get<{ message: string, appointments: Appointment[] }>(this.url + 'sp/appoint/get')
    .subscribe((recievedAppointments) => {
      this.appointments = recievedAppointments.appointments;
      this.appointmentsUpdated.next([...this.appointments]);
    });
  }

   // get single booking
   getBooking(bookingId: string ) {
    this.http.get<{ message: string, booking: Booking }>(this.url + 'sp/booking/get/' + bookingId )
    .subscribe((recievedBooking) => {
      this.booking = recievedBooking.booking;
      this.bookingUpdated.next(this.booking);
    });
  }

   // get single appointment
   getAppointment(appointId: string) {
    this.http.get<{ message: string, appointment: Appointment }>(this.url + 'sp/appoint/get/' + appointId)
    .subscribe((recievedAppointment) => {
      this.appointment = recievedAppointment.appointment;
      this.appointmentUpdated.next(this.appointment);
    });
  }

  // get dashboard stat
  getDashStat() {
    this.http.get<{ message: string, dashstat: DashStat }>(this.url + 'sp/dashstat/get')
    .subscribe((recievedData) => {
      this.dashstat = recievedData.dashstat;
      this.dashStatUpdated.next(this.dashstat);
    });
  }

  // get dashboard stat
  getPaymentStat() {
    this.http.get<{ message: string, paystat: PayStat }>(this.url + 'sp/paystat/get')
    .subscribe((recievedData) => {
      this.paystat = recievedData.paystat;
      this.payStatUpdated.next(this.paystat);
    });
  }


  // listners for subjects
  getBookingsUpdateListener() {
    return this.bookingsUpdated.asObservable();
  }

  getAppointmentsUpdateListener() {
    return this.appointmentsUpdated.asObservable();
  }

  getBookingUpdatedListener() {
    return this.bookingUpdated.asObservable();
  }

  getAppointmentUpdatedListener() {
    return this.appointmentUpdated.asObservable();
  }

  getDashStatUpdatedListener() {
    return this.dashStatUpdated.asObservable();
  }

  getPayStatUpdatedListener() {
    return this.payStatUpdated.asObservable();
  }

  getCalendarBookingsUpdatedListener() {
    return this.calendarBookingsUpdated.asObservable();
  }


}
