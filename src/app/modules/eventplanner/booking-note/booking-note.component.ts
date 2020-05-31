import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';

import { EventPlannerService } from '../eventplanner.service';
import { Booking, Appointment } from '../eventplanner.model';


@Component({
  selector: 'app-booking-note',
  templateUrl: './booking-note.component.html',
  styleUrls: ['./booking-note.component.scss']
})
export class BookingNoteComponent implements OnInit, OnDestroy {

  private bookingUpdated: Subscription;
  private appointmentUpdated: Subscription;

  // stored booking id from active route
  Id: string;

  // recievd booking
  booking: Booking;

  // recieved appointment
  appointment: Appointment;

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
    });
    } else if (this.route.snapshot.url[1].path === 'appoint') {
      this.eventPlannerService.getAppointment(this.Id);
      this.appointmentUpdated = this.eventPlannerService.getAppointmentUpdatedListener()
      .subscribe((recievedData: Appointment) => {
        this.appointment = recievedData;
        console.log(this.appointment);
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
    this.booking = undefined;
    this.appointment = undefined;
  }

  public printData() {
    const data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('images/print/');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      const today = new Date().toISOString();
      pdf.save('Note_' + today + '.pdf'); // Generated PDF
    });
  }

  backClicked() {
    this.location.back();
  }

}
