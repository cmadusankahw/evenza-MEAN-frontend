import {  OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';


import { TheEvent, EventCategory, EventSegment, EventCard } from './event.model';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({ providedIn: 'root' })
export class EventService {

  private eventsUpdated = new Subject<EventCard[]>();
  private eventUpdated = new Subject<TheEvent>();
  private eventCategoryUpdated = new Subject<EventCategory>();
  private eventCategoriesUpdated = new Subject<EventCategory[]>();

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';

  private event: TheEvent;

  private events: EventCard[];

  private eventCategories: EventCategory[];

  private eventCategory: EventCategory;


    constructor(private router: Router,
                public dialog: MatDialog,
                private http: HttpClient) {}

    // get methods

    getEvents() {
      this.http.get<{ message: string, events: EventCard[] }>(this.url + 'event/get' )
      .subscribe((recievedData) => {
        console.log(recievedData.events);
        this.events = recievedData.events;
        this.eventsUpdated.next([...this.events]);
     });
    }

    getEvent(eventId: string) {
      this.http.get<{ message: string, event: TheEvent }>(this.url + 'event/get/' + eventId)
      .subscribe((recievedData) => {
        console.log(recievedData.event);
        this.event = recievedData.event;
        this.eventUpdated.next(this.event);
     });
    }

    getEventCategories() {
      this.http.get<{ message: string, categories: EventCategory[] }>(this.url + 'event/cat' )
      .subscribe((recievedData) => {
        console.log(recievedData.categories);
        this.eventCategories = recievedData.categories;
        this.eventCategoriesUpdated.next([...this.eventCategories]);
     });
    }

    // set methods

    createEvent() {

    }

    updateEvent() {

     // this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
    }

    removeEvent() {

    }

    // change state planned/ completed/ published
    changeEventState() {

    }

    // create new alert
    createAlert() {

    }

    sendInvitation() {

    }


    // listeners

    getEventsUpdatedListener() {
      return this.eventsUpdated.asObservable();
    }

    getEventUpdatedListener() {
      return this.eventUpdated.asObservable();
    }


    getEventCategoryUpdated() {
      return this.eventCategoryUpdated.asObservable();
    }

}
