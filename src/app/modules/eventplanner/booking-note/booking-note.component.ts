import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { EventPlannerService } from '../eventplanner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-note',
  templateUrl: './booking-note.component.html',
  styleUrls: ['./booking-note.component.scss']
})
export class BookingNoteComponent implements OnInit {

  bookingId: string;

  constructor(private eventPlannerService: EventPlannerService,
              private route: ActivatedRoute) {
                this.bookingId = route.snapshot.params.id;
              }

  ngOnInit() {
    this.eventPlannerService.getBooking(this.bookingId);
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
      pdf.save('Booking_Note_' + today + '.pdf'); // Generated PDF
    });
  }

}
