import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';


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


  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];


  constructor() { }

  ngOnInit() {
  }


  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg) {
    const foo = prompt('Enter Booking Title');
    if (foo) {
    if (confirm('Would you like to add booking "' + foo + '" to ' + arg.dateStr + ' ?' )) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: foo,
        start: arg.date,
        allDay: arg.allDay
      });
    }
  }
}

}



