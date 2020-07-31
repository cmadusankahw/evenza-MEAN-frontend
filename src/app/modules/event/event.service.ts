import {  OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';


import { TheEvent, EventCategory, EventCard, Task, Participant, Alert, ScheduleAlert, Filteration } from './event.model';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({ providedIn: 'root' })
export class EventService {

  private eventsUpdated = new Subject<EventCard[]>();
  private eventUpdated = new Subject<TheEvent>();
  private eventCategoryUpdated = new Subject<EventCategory>();
  private eventCategoriesUpdated = new Subject<EventCategory[]>();
  private alertsUpdated = new Subject<ScheduleAlert[]>();

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';

  private event: TheEvent;

  private events: EventCard[];

  private eventCategories: EventCategory[];

  private eventCategory: EventCategory;

  private recievedAlerts: ScheduleAlert[];

  // passing selected event for service/ product search
  private eventId: string;

  // passing selected filterations for service/ product search
  private filter: Filteration;

    constructor(private router: Router,
                public dialog: MatDialog,
                private http: HttpClient) {}


  // setters
  setSelectedEvent(eventId: string) {
    this.eventId = eventId;
  }

  setSelectedFilteration(filter: Filteration) {
    this.filter = filter;
  }

  // getters

  getSelectedEvent() {
    return this.eventId;
  }

  getSelectedFilteration() {
    return this.filter;
  }


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

    getEventCategory(catId: string) {
      this.http.get<{ message: string, category: EventCategory }>(this.url + 'event/cat/' + catId )
      .subscribe((recievedData) => {
        console.log(recievedData.category);
        this.eventCategory = recievedData.category;
        this.eventCategoryUpdated.next(this.eventCategory);
     });
    }

    getAlerts(id: string) {
      this.http.get<{ message: string, alerts: ScheduleAlert[] }>(this.url + 'event/get/alerts/' + id )
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.recievedAlerts = recievedData.alerts;
        this.alertsUpdated.next([...this.recievedAlerts]);
     });
    }

    // creating an evnt category
    createCategory(eventCategory: EventCategory, categoryImage: File) {
      if (categoryImage){
        const catImage = new FormData();
        catImage.append('images[]', categoryImage, categoryImage.name);
        console.log(catImage);
        this.http.post<{imagePath: string}>(this.url + 'event/cat/img', catImage )
          .subscribe ((recievedImage) => {
            if (recievedImage){
              eventCategory.img = recievedImage.imagePath;
            }
            this.http.post<{ message: string}>(this.url + 'event/cat/create',  eventCategory )
            .subscribe((recievedData) => {
              this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
           });
          });
      } else {
        this.http.post<{ message: string}>(this.url + 'event/cat/create',  eventCategory )
        .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
       });
      }
    }

    // removing an event category
    removeCategory(id: string) {
      this.http.post<{ message: string }>(this.url + 'event/cat/remove',  id )
      .subscribe((recievedData) => {
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
     });
    }



    // creating a new event
    createEvent(event: TheEvent, image: File) {
      if (image) {
        console.log('image uploading');
        const newImages = new FormData();
        newImages.append('images[]', image, image.name);

        this.http.post<{imageUrl: string}>(this.url + 'event/add/img', newImages )
        .subscribe ((recievedImages) => {
          event.feature_img = recievedImages.imageUrl;
          this.http.post<{ message: string }>(this.url + 'event/add',  event )
           .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner']);
       });
    });
      } else {
        this.http.post<{ message: string }>(this.url + 'event/add',  event )
        .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner']);
       });
      }
    }

    // updating the event basic settings
    updateEvent(event: TheEvent, image: File) {
      // if budget changed in event plan event segments should be updated
      if (image) {
        const newImages = new FormData();
        newImages.append('images[]', image, image.name);

        this.http.post<{imageUrl: string}>(this.url + 'event/edit/img', newImages )
        .subscribe ((recievedImages) => {
        if (recievedImages.imageUrl) {
          event.feature_img = recievedImages.imageUrl;
        }
        this.http.post<{ message: string }>(this.url + 'event/edit',  event )
        .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner/events']);
       });
    });
      }  else {
        this.http.post<{ message: string }>(this.url + 'event/edit',  event )
        .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner/events']);
       });
      }
    }

    // cancel an event
    removeEvent() {
      // event state will be changed to cancelled
      // all pending servies and prodcuts will be sent with cancell requests
      // all participants will be sent a cancellation notice
    }

    // change state planned/ completed/ published
    changeEventState() {

    }

    // create new alert
    createAlert() {
     // this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
    }


    // add new task as an event segment
    createTask(newTask: Task, eventId: string) {
      this.http.post<{ message: string }>(this.url + 'event/tasks/add',  {task: newTask, eventId} )
      .subscribe((recievedData) => {
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/plan/' + eventId]);
     });
    }

    // update selected task
    updateTask(newTask: Task, eventId: string) {
      this.http.post<{ message: string }>(this.url + 'event/tasks/edit', {task: newTask, eventId}  )
      .subscribe((recievedData) => {
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/plan/' + eventId]);
     });
    }

    // updating all tasks, service, product changes on ngOnDestroy of event_plan
    updateTasks(tasks: Task[], eventId: string) {
        this.http.post<{ message: string }>(this.url + 'event/plan/update', {tasks, eventId}  )
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner/event/plan/' + eventId]);
       });
      }

      // update all invitation, participant changess on OnDestroy of event_participants
    updateParticipantChanges(participants: Participant[], invitation: Alert, eventId: string) {
      this.http.post<{ message: string }>(this.url + 'event/participants/update', {participants, invitation, eventId} )
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
       // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       // this.router.onSameUrlNavigation = 'reload';
       // this.router.navigate(['/planner/event/plan/' + eventId]);
     });
    }

    // publish event
    publishEvent(eventId: string) {
      this.http.post<{ message: string }>(this.url + 'event/publish', {eventId} )
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/details/' + eventId]);
     });
    }


    // listeners
    getEventsUpdatedListener() {
      return this.eventsUpdated.asObservable();
    }

    getEventUpdatedListener() {
      return this.eventUpdated.asObservable();
    }


    getEventCategoryUpdatedListener() {
      return this.eventCategoryUpdated.asObservable();
    }

    getEventCategoriesUpdatedListener() {
      return this.eventCategoriesUpdated.asObservable();
    }

    getalertsUpdatedListener() {
      return this.alertsUpdated.asObservable();
    }

}
