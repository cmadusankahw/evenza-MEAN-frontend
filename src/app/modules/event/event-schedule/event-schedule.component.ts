import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { TheEvent, Task,  CalendarTask } from '../event.model';

@Component({
  selector: 'app-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit, OnDestroy {

  @ViewChild('calendar', {static: true}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;

  // subscription
  private eventSub: Subscription;

  event: TheEvent;

  calendarEvents: CalendarTask[] = [];

  // recieved event id
  Id: string;

  // creating calendar event
  calendarSelected = false;

  newTask =  {
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  };


  constructor(private eventService: EventService,
              private router: Router) { }

  ngOnInit() {
    this.eventService.getEvent(this.Id);
    this.eventSub = this.eventService.getEventUpdatedListener()
          .subscribe((recievedData: TheEvent) => {
              if (this.event) {
                this.event = recievedData;
                console.log(this.event);
                for (const segment of this.event.event_segments) {
                  if (segment.segment_type === 'service') {
                    if (segment.object.booking_id != null) {
                      this.calendarEvents.push({
                        title: segment.segment_title,
                        start: new Date(segment.sceduled_from_date),
                        end: new Date(segment.scheduled_to_date),
                        backgroundColor: 'blue'
                      });
                    }
                    if (segment.object.appoint_id != null) {
                    this.calendarEvents.push({
                      title: segment.segment_title,
                      start: new Date(segment.sceduled_from_date),
                      end: new Date(segment.scheduled_to_date),
                      backgroundColor: 'green'
                    });
                   }
                  } else if  (segment.segment_type === 'task') {
                    this.calendarEvents.push({
                      title: segment.segment_title,
                      start: new Date(segment.sceduled_from_date),
                      end: new Date(segment.scheduled_to_date),
                      backgroundColor: 'pink'
                    });
                  }
                }
           }
      });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }


  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleSelect(event) {
    console.log(event);
    this.newTask = {
      start: event.start.toISOString(),
      end: event.end.toISOString()
      };
    setTimeout (() => {
      this.calendarSelected = true;
    }, 500);
  }


  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/planner/event/schedule/{{event.event_id}}']);
  }

}
