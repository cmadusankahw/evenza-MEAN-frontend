import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService } from '../event.service';
import { EventCard } from '../event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {


  @Output() eventEmiit = new EventEmitter<{ eventId: string, eventName: string }>();

  // subscription
  private eventSub: Subscription;

  // recieved events
  events: EventCard[] = [];

  // event successfully sent
  success = false;

  // emitting event details
  eventDetails: { eventId: string, eventName: string };


  constructor(private router: Router,
    private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents();
    this.eventSub = this.eventService.getEventsUpdatedListener()
      .subscribe((recievedEvents: EventCard[]) => {
        if (recievedEvents) {
          this.events = recievedEvents;
          this.eventDetails = { eventId: recievedEvents[0].event_id, eventName: recievedEvents[0].event_title };
          console.log(this.events);
        }
      });
  }

  emittEvents() {
    this.eventEmiit.emit(this.eventDetails);
    console.log(this.eventDetails);
  }


}
