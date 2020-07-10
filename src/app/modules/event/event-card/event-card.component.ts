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
   events: Event[];

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
