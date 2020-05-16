import {  OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Event } from './event.model';


@Injectable({ providedIn: 'root' })
export class EventService implements OnDestroy {

  private eventsUpdated = new Subject<Event[]>();

    constructor() {}


    ngOnDestroy() {
      if (this.eventsUpdated) {
        this.eventsUpdated.unsubscribe();
      }
    }


    getEvents() {

    }

    // listeners

    getEventsUpdatedListener() {
      return this.eventsUpdated.asObservable();
    }

}
