import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Booking, Appointment } from './serviceprovider.model';
import { Email } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({providedIn: 'root'})
export class ServiceProviderService {

  // api url
  url = 'http://localhost:3000/api/';

  // subjects
  private bookingsUpdated = new Subject<Booking[]>();
  private appointmentsUpdated = new Subject<Appointment[]>();

  private bookingUpdated = new Subject<Booking>();
  private appointmentUpdated = new Subject<Appointment>();

  // recieved bookings
  private bookings: Booking[];

  // recieved appointments
  private appointments: Appointment[];

   // recieved single booking
   private booking: Booking;

   // recieved single appointment
  private appointment: Appointment;


  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog) {}


  // change booking stste
  changeBookingState(bookingState: {bookingId: string, state: string}) {
    this.http.post<{ message: string, booking: Booking }>(this.url + 'sp/booking/edit/' + bookingState.bookingId, bookingState)
      .subscribe((recievedData) => {
        this.booking = recievedData.booking;
        this.bookingUpdated.next(this.booking);
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
      });
  }

  // change appointment stste
  changeAppointmentState(appointState: {appointId: string, state: string}) {
    this.http.post<{ message: string, appointment: Appointment }>(this.url + 'sp/appoint/edit/' + appointState.appointId, appointState)
      .subscribe((recievedData) => {
        this.appointment = recievedData.appointment;
        this.appointmentUpdated.next(this.appointment);
        this.dialog.open(SuccessComponent, {data: {message: 'recievedData.message'}});
      });
  }


  // user profile change password
  changeUserPassword(currentPword: string, newPword: string) {
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

}
