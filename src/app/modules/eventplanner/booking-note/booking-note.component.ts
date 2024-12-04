import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';

import { EventPlannerService } from '../eventplanner.service';
import { Booking, Appointment, Email, Order, printData } from '../eventplanner.model';


@Component({
  selector: 'app-booking-note',
  templateUrl: './booking-note.component.html',
  styleUrls: ['./booking-note.component.scss']
})
export class BookingNoteComponent implements OnInit, OnDestroy {

  private bookingUpdated: Subscription;
  private appointmentUpdated: Subscription;
  private orderUpdated: Subscription;

  // stored booking id from active route
  Id: string;

  // recievd booking
  booking: Booking;

  // recieved appointment
  appointment: Appointment;

  // recieved order
  order: Order;


  constructor(private eventPlannerService: EventPlannerService,
              private route: ActivatedRoute,
              private location: Location) {
                this.Id = route.snapshot.params.id;
              }

  ngOnInit() {
    if (this.route.snapshot.url[1].path === 'booking') {
      this.eventPlannerService.getBooking(this.Id);
      this.bookingUpdated = this.eventPlannerService.getBookingUpdatedListener()
      .subscribe((recievedData: Booking) => {
        this.booking = recievedData;
        console.log(this.booking);
        // this.sendEmail('Booking on ' + this.booking.service_name);
    });
    } else if (this.route.snapshot.url[1].path === 'appoint') {
      this.eventPlannerService.getAppointment(this.Id);
      this.appointmentUpdated = this.eventPlannerService.getAppointmentUpdatedListener()
      .subscribe((recievedData: Appointment) => {
        this.appointment = recievedData;
        console.log(this.appointment);
       // this.sendEmail('Visit Appointment on ' + this.appointment.service_name);
    });
    } else if (this.route.snapshot.url[1].path === 'order') {
      this.eventPlannerService.getOrder(this.Id);
      this.orderUpdated = this.eventPlannerService.getOrderUpdatedListender()
      .subscribe((recievedData: Order) => {
        this.order = recievedData;
        console.log(this.order);
       // this.sendEmail('Visit Appointment on ' + this.appointment.service_name);
    });
   }
  }

  ngOnDestroy() {
    if (this.bookingUpdated) {
      this.bookingUpdated.unsubscribe();
    }
    if (this.appointmentUpdated) {
      this.appointmentUpdated.unsubscribe();
    }
    if (this.orderUpdated) {
      this.orderUpdated.unsubscribe();
    }
    this.booking = undefined;
    this.appointment = undefined;
  }

  printIt(content: string, type: string) {
    printData(content, type);
  }


  // sending relavant emails
  sendEmail(subjectString: string) {
    const mail: Email = {
      email: null,
      subject: subjectString,
      html: document.getElementById('content').innerHTML
    };
    console.log(mail);
    this.eventPlannerService.sendEmail(mail);
  }

  backClicked() {
    this.location.back();
  }
}
