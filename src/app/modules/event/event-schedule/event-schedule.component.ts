import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
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
    start: new Date(),
    end: new Date(),
  };


  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) {
                this.Id = route.snapshot.params.id;
               }

  ngOnInit() {
    this.eventService.getEvent(this.Id);
    this.eventSub = this.eventService.getEventUpdatedListener()
          .subscribe((recievedData: TheEvent) => {
              if (recievedData) {
                this.event = recievedData;
                console.log(this.event);
                for (const service of this.event.event_segments.services) {
                    if (service.booking_id != null) {
                      this.calendarEvents.push({
                        title: 'Booking on ' + service.service_name,
                        start: new Date(service.booking_from_date),
                        end: new Date(service.booking_to_date),
                        backgroundColor: 'blue'
                      });
                    }
                    if (service.appoint_id != null) {
                    this.calendarEvents.push({
                      title: 'Appointment on ' + service.service_name ,
                      start: new Date(service.appointed_date),
                      end: new Date(service.appointed_date),
                      backgroundColor: 'green'
                    });
                   }
                }
                for (const task of this.event.event_segments.tasks) {
                    this.calendarEvents.push({
                      title: task.title,
                      start: new Date(task.scheduled_from_date),
                      end: new Date(task.scheduled_to_date),
                      backgroundColor: 'pink'
                    });
                }
            }
              console.log(this.calendarEvents);
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
      start: event.start,
      end: event.end
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
