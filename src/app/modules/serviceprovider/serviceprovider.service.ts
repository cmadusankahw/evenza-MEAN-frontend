import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

import {
  Booking,
  Appointment,
  DashStat,
  PayStat,
  CalendarBooking,
  AppointStat,
  BookingStat,
  Earnings,
  BookingReport,
  AppointmentReport,
} from './serviceprovider.model';
import { Email } from '../eventplanner/eventplanner.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { PaymentData, MerchantPayments } from '../admin/admin.model';
import { getUrl, getSocketUrl } from 'src/assets/url';

@Injectable({ providedIn: 'root' })
export class ServiceProviderService {
  // socket connection
  private socket = io(getSocketUrl());

  // api url
  url = getUrl();

  // subjects
  private bookingsUpdated = new Subject<Booking[]>();
  private appointmentsUpdated = new Subject<Appointment[]>();
  private calendarBookingsUpdated = new Subject<CalendarBooking[]>();
  private bookingUpdated = new Subject<Booking>();
  private appointmentUpdated = new Subject<Appointment>();
  private dashStatUpdated = new Subject<DashStat>();
  private payStatupdated = new Subject<PayStat>();
  private earningsUpdated = new Subject<Earnings[]>();
  private reportStatUpdated = new Subject<boolean>();
  private spNamesUpdated = new Subject<any>();

  // report generation related subjects
  private bookingReportUpdated = new Subject<BookingReport[]>();
  private appointReportUpdated = new Subject<AppointmentReport[]>();
  private paymentDetailsUpdated = new Subject<any>();
  private spIdUpdated = new Subject<string>();

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
  // service provider earnings
  private earnings: Earnings[] = [];
  // keep stat for report generation
  private bookingStat: BookingStat[] = [];
  private appointStat: AppointStat[] = [];
  // get service provider ID for report generation
  private spId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) { }

  // change booking stste
  changeBookingState(bookingState: { bookingId: string; state: string }) {
    this.http
      .post<{ message: string; booking: Booking }>(
        this.url + 'sp/booking/edit',
        bookingState
      )
      .subscribe((recievedData) => {
        this.booking = recievedData.booking;
        this.bookingUpdated.next(this.booking);
        this.sendBookingState(
          bookingState.bookingId,
          recievedData.booking.service_name,
          bookingState.state
        );
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // change booking stste
  updateBookingState(bookingState: { bookingId: string; state: string }) {
    this.http
      .post<{ message: string; booking: Booking }>(
        this.url + 'sp/booking/edit',
        bookingState
      )
      .subscribe((recievedData) => {
        this.sendBookingState(
          bookingState.bookingId,
          recievedData.booking.service_name,
          bookingState.state
        );
      });
  }

  // change appointment stste
  changeAppointmentState(appointState: { appointId: string; state: string }) {
    this.http
      .post<{ message: string; appointment: Appointment }>(
        this.url + 'sp/appoint/edit',
        appointState
      )
      .subscribe((recievedData) => {
        this.appointment = recievedData.appointment;
        this.appointmentUpdated.next(this.appointment);
        this.sendAppointmentState(
          appointState.appointId,
          recievedData.appointment.service_name,
          appointState.state
        );
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // send emails
  sendEmail(mail: Email) {
    this.http
      .post<{ message: string }>(this.url + 'sp/mail', mail)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // get methods

  // get list of bookings of an event planner
  getCalendarBookings() {
    this.http
      .get<{ message: string; bookings: Booking[] }>(
        this.url + 'sp/calbooking/get'
      )
      .subscribe((recievedBookings) => {
        for (const book of recievedBookings.bookings) {
          this.calendarBookings.push({
            title: book.event_name,
            start: book.from_date,
            end: book.to_date,
          });
        }
        this.calendarBookingsUpdated.next([...this.calendarBookings]);
      });
  }

  // get list of bookings of an event planner
  getBookings() {
    this.http
      .get<{ message: string; bookings: Booking[] }>(
        this.url + 'sp/booking/get'
      )
      .subscribe((recievedBookings) => {
        this.bookings = recievedBookings.bookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
  }

  // get list of appointments of an event planner
  getAppointments() {
    this.http
      .get<{ message: string; appointments: Appointment[] }>(
        this.url + 'sp/appoint/get'
      )
      .subscribe((recievedAppointments) => {
        this.appointments = recievedAppointments.appointments;
        this.appointmentsUpdated.next([...this.appointments]);
      });
  }

  // get single booking
  getBooking(bookingId: string) {
    this.http
      .get<{ message: string; booking: Booking }>(
        this.url + 'sp/booking/get/' + bookingId
      )
      .subscribe((recievedBooking) => {
        this.booking = recievedBooking.booking;
        this.bookingUpdated.next(this.booking);
      });
  }

  // get single appointment
  getAppointment(appointId: string) {
    this.http
      .get<{ message: string; appointment: Appointment }>(
        this.url + 'sp/appoint/get/' + appointId
      )
      .subscribe((recievedAppointment) => {
        this.appointment = recievedAppointment.appointment;
        this.appointmentUpdated.next(this.appointment);
      });
  }

  // get stat for report generation (only once)
  getReportStat() {
    this.http
      .get<{
        message: string;
        appoints: AppointStat[];
        bookings: BookingStat[];
      }>(this.url + 'sp/stat/get')
      .subscribe((recievedData) => {
        this.bookingStat = recievedData.bookings;
        this.appointStat = recievedData.appoints;
        this.reportStatUpdated.next(true);
      });
  }

  // update bookinfs on completion !!!! realtime
  updateBookings() {
    this.http
      .get<{ message: string; bookings: Booking[] }>(
        this.url + 'sp/booking/get'
      )
      .subscribe((recievedBookings) => {
        this.checkBookings(recievedBookings.bookings);
      });
  }

  async checkBookings(recievedBookings: Booking[]) {
    const tday = new Date();
    const newBookings: Booking[] = recievedBookings;
    for (const book of recievedBookings) {
      const toDate = new Date(book.to_date);
      if (book.state === 'pending' && toDate <= tday) {
        console.log('found', book.booking_id);
        this.updateBookingState({
          bookingId: book.booking_id,
          state: 'completed',
        });
        newBookings.splice(recievedBookings.indexOf(book));
      }
    }
    await this.addData(newBookings);
  }

  addData(recievedBookings: Booking[]) {
    return new Promise((resolve) => {
      this.bookings = recievedBookings;
      this.bookings = recievedBookings;
      this.bookingsUpdated.next([...this.bookings]);
    });
  }

  // serviceprovider report generation handeling

  // get service provider names for reporting
  getSpNames() {
    this.http
      .get<{
        message: string;
        spnames: { service_name: string; service_id: string }[];
      }>(this.url + 'sp/get/spnames')
      .subscribe((res) => {
        this.spNamesUpdated.next(res.spnames);
      });
  }

  getSPId() {
    this.http.get<{ id: string }>(this.url + 'sp/get/spid').subscribe((res) => {
      this.spId = res.id;
      this.spIdUpdated.next(res.id);
    });
  }

  // get booking details for service order report
  public getServiceOrderReport(fromDate: string, toDate: string) {
    this.http
      .post<{ message: string; bookings: BookingReport[] }>(
        this.url + 'sp/reports/booking',
        { fromDate, toDate }
      )
      .subscribe((res) => {
        console.log(res.message);
        this.bookingReportUpdated.next(res.bookings);
      });
  }

  // get appointment details for service order report
  public getServiceAppointReport(fromDate: string, toDate: string) {
    this.http
      .post<{ message: string; appoints: AppointmentReport[] }>(
        this.url + 'sp/reports/appoint',
        { fromDate, toDate }
      )
      .subscribe((res) => {
        console.log(res.message);
        this.appointReportUpdated.next(res.appoints);
      });
  }

  // get payments & earnings details for service order report
  public getPaymentEarningReport() {
    this.http
      .get<{ message: string; payments: MerchantPayments; earnings: any[] }>(
        this.url + 'sp/reports/payment'
      )
      .subscribe((res) => {
        console.log(res);
        this.paymentDetailsUpdated.next(res);
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

  getEarningstUpdatedListener() {
    return this.earningsUpdated.asObservable();
  }

  getPaystatUpdatedListener() {
    return this.payStatupdated.asObservable();
  }

  getCalendarBookingsUpdatedListener() {
    return this.calendarBookingsUpdated.asObservable();
  }

  getReportStatUpdatedListener() {
    return this.reportStatUpdated.asObservable();
  }

  // report genration related listeners

  getSpNamesupdatedListener() {
    return this.spNamesUpdated.asObservable();
  }

  getBookingreportUpdatedListener() {
    return this.bookingReportUpdated.asObservable();
  }

  getAppointreportUpdatedListener() {
    return this.appointReportUpdated.asObservable();
  }

  getPaymentsDetailsUpdatedListener() {
    return this.paymentDetailsUpdated.asObservable();
  }

  getSpIdUpdatedListener() {
    return this.spIdUpdated.asObservable();
  }

  // get dashboard stats
  getDashStat() {
    // initial declaration
    const dashStat: DashStat = {
      pending_bookings: 0,
      last_book_date: 'loading...',
      pending_appointments: 0,
      last_appointment_date: 'loading...',
      completed_bookings: 0,
      last_completed_book_date: 'loading...',
      approved_appointments: 0,
      last_approved_appointment_date: 'loading...',
    };

    // booking stat
    let c = 0;
    let a = 0;
    let b = 0;
    let n = 0;
    let m = 0;
    let k = 0;

    if (this.bookingStat) {
      for (const book of this.bookingStat) {
        if (book.state === 'pending') {
          dashStat.pending_bookings++;
          n = k;
        }
        if (book.state === 'completed') {
          dashStat.completed_bookings++;
          m = k;
        }
        k++;
      }
      dashStat.last_book_date = this.bookingStat[n].created_date.slice(0, 10);
      dashStat.last_completed_book_date = this.bookingStat[
        m
      ].created_date.slice(0, 10);
    }

    if (this.appointStat) {
      for (const app of this.appointStat) {
        if (app.state === 'pending') {
          dashStat.pending_appointments++;
          a = c;
        }
        if (app.state === 'confirmed') {
          dashStat.approved_appointments++;
          b = c;
        }
        c++;
      }
      dashStat.last_appointment_date = this.appointStat[a].created_date.slice(
        0,
        10
      );
      dashStat.last_approved_appointment_date = this.appointStat[
        b
      ].created_date.slice(0, 10);
    }
    setTimeout(() => {
      this.dashstat = dashStat;
      this.dashStatUpdated.next(dashStat);
    }, 1000);
  }

  // get business stat for business profile
  getEarnings() {
    const earnings: Earnings[] = [];

    // loop through bookings
    if (this.bookingStat) {
      for (const book of this.bookingStat) {
        const earning: Earnings = {
          transaction_id: book.booking_id,
          booking_id: book.booking_id,
          service_booked: book.service_name,
          earned_date: book.created_date.slice(0, 10),
          earned_time: book.created_date.slice(11, 16),
          payment_type: 'card',
          commission_due: (book.amount * 5) / 100,
          amount_paid: book.amount_paid,
          amount: book.amount,
        };
        earnings.push(earning);
      }
    }
    setTimeout(() => {
      this.earnings = earnings;
      this.earningsUpdated.next(earnings);
    }, 1000);
  }

  // realtime notifications with socket.io

  // trigger booking state change event realtime for interested listeners
  onBookingStateChanged() {
    const observable = new Observable<{
      bookingId: string;
      service: string;
      state: string;
    }>((observer) => {
      this.socket.on('booking state', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // emit socket once a booking state chnaged
  sendBookingState(bookingId: string, service: string, state: string) {
    this.socket.emit('booking-state', { bookingId, service, state });
  }

  // emit socket once a appoint state changed
  sendAppointmentState(appointId: string, service: string, state: string) {
    this.socket.emit('appoint-state', { appointId, service, state });
  }

  // trigger appointment state change event realtime for interested listeners
  onAppointmentStateChanged() {
    const observable = new Observable<{
      appointId: string;
      service: string;
      state: string;
    }>((observer) => {
      this.socket.on('appoint stat', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
