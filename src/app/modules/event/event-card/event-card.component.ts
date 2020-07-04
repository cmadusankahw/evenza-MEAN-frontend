import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

   // subscription
   private eventSub: Subscription ;

   // recieved events
   events: Event[] = [
     {
      event_id: 'E1',
      event_title: 'Wedding',
      description: 'sample wedding event',
      event_type: 'open',
      event_category: 'Wedding',
      from_date: '17/05/2020',
      from_time: '08:00 AM',
      to_date: '17/05/2020',
      to_time: '06:00 AM',
      one_day_event: true,
      created_date: '16/05/2020',
      location: 'Soysa Hotel, Matara, Sri Lanka',
      no_of_participants: 11,
      total_budget: 450000,
      host_name: 'Chiran Hw',
      host_email: 'cmadusankahw@gmail.com',
      feature_img: './assets/images/events/1.jpg',
      state: 'planned'
     }
    ];

   // event successfully sent
   success = false;


  constructor(private router: Router,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents();
    this.eventSub = this.eventService.getEventsUpdatedListener()
      .subscribe((recievedEvents: Event[]) => {
        if (recievedEvents) {
          this.events = recievedEvents;
          console.log(this.events);
        }
  });
 }

  sendEvent(event: Event) {
    // this.success = this.eventService.sendEvent(event);
   }

}
