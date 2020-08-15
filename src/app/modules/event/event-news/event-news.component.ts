import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { EventCard } from '../event.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-news',
  templateUrl: './event-news.component.html',
  styleUrls: ['./event-news.component.scss']
})
export class EventNewsComponent implements OnInit, OnDestroy {

  // subscription
  private eventSub: Subscription;

  // recieved vent details
  events: EventCard[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getOpenEvents();
    this.eventSub = this.eventService.getOpenEventsUpdatedListener()
      .subscribe((recievedData: EventCard[]) => {
        this.events = recievedData;
        console.log(this.events);
      });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

}
