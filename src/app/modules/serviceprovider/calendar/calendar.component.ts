import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { Booking } from '../../service/service.model';
import { ServiceProviderService } from '../serviceprovider.service';
import { CalendarBooking } from '../serviceprovider.model';
import { ServiceService } from '../../service/service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {



  @ViewChild('calendar', {static: true}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;

  // subscription
  private calendarBookingSub: Subscription;

  calendarEvents: CalendarBooking[] = [];

  // creating event modal
  fullDayEvent = false;
  eventTitle: string;


  constructor(private serviceProviderService: ServiceProviderService,
              private serviceService: ServiceService,
              private router: Router) { }

  ngOnInit() {
    this.serviceProviderService.getCalendarBookings();
    this.calendarBookingSub = this.serviceProviderService.getCalendarBookingsUpdatedListener()
          .subscribe((recievedBookings: CalendarBooking[]) => {
              this.calendarEvents = recievedBookings;
              console.log(this.calendarEvents);
      });
  }



  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  // handleDateClick(arg: EventInput) {
   // document.getElementById('eventCreate').click();
    // const foo = prompt('Enter Booking Title');
    // if (confirm('Would you like to add booking "' + foo + '" to ' + arg.dateStr + ' ?' )) {
   // }
   // (dateClick)="handleDateClick($event)"
 // }

  handleSelect(event) {
      const foo = prompt('Enter Booking Title');
      if (confirm('Would you like to add booking "' + foo + '" from ' + event.start + ' to ' + event.end + ' ?' )) {
        console.log(event);
        const newEvent = {
          title: foo,
          start: event.start,
          end: event.end
        };
        console.log(newEvent);
        this.calendarEvents = this.calendarEvents.concat(newEvent);
        setTimeout( () => {
          newEvent.start = newEvent.start.toISOString();
          newEvent.end = newEvent.end.toISOString();
          this.createCalendarEvent(newEvent);
          setTimeout (() => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/sp/dash/calendar']);
          }, 1000);
        }, 500);
      }
    }

  createCalendarEvent(newEvent: CalendarBooking) {
    const booking: Booking = {
      booking_id: 'B0',
      service_id: 'SPBook',
      event_id: 'SPBook',
      service_name: 'SPBook',
      service_category: 'SPBook',
      event_name: newEvent.title,
      business_name: 'SPBook',
      rate_type: 'SPBook',
      created_date: new Date().toISOString(),
      state: 'SPBook',
      review: 'SPBook',
      from_date: newEvent.start,
      to_date: newEvent.end,
      duration: 0,
      from_time: {hour: Number(newEvent.start.slice(11, 13)), minute: Number(newEvent.start.slice(14, 16)), second: 0 },
      to_time: {hour: Number(newEvent.end.slice(11, 13)), minute: Number(newEvent.end.slice(14, 16)), second: 0 },
      comment: 'SPBook',
      amount: 0,
      commission_due: 0,
      amount_paid: 0,
      };
    console.log(booking);
    this.serviceService.createCalendarBooking(booking);
    }

}



