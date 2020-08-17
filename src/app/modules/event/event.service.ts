import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';


import { TheEvent, EventCategory, EventCard, Task, Participant, Alert, ScheduleAlert, Filteration, RegistrationForm } from './event.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { getUrl } from 'src/assets/url';


@Injectable({ providedIn: 'root' })
export class EventService {

  // observer pattern - subjects
  private eventsUpdated = new Subject<EventCard[]>();
  private openEventsUpdated = new Subject<EventCard[]>();
  private eventUpdated = new Subject<TheEvent>();
  private eventCategoryUpdated = new Subject<EventCategory>();
  private eventCategoriesUpdated = new Subject<EventCategory[]>();
  private alertsUpdated = new Subject<ScheduleAlert[]>();

  // api url
  public url = getUrl();
  // recieved event
  private event: TheEvent;
  // recieved events
  private events: EventCard[];
  // recieved open events
  private openEvents: EventCard[];
  // recieved event categories
  private eventCategories: EventCategory[];
  // recieved event category
  private eventCategory: EventCategory;
  // recieved alerts
  private recievedAlerts: ScheduleAlert[];
  // passing selected event for service/ product search
  private eventId: string;
  // passing selected filterations for service/ product search
  private filter: Filteration;

  constructor(private router: Router,
              public dialog: MatDialog,
              private http: HttpClient) { }


  // setters
  public setSelectedEvent(eventId: string) {
    this.eventId = eventId;
  }

  public setSelectedFilteration(filter: Filteration) {
    this.filter = filter;
  }

  // getters

  // get selected event
  public getSelectedEvent() {
    return this.eventId;
  }

  // get selected filteration to filter services or products
  public getSelectedFilteration() {
    return this.filter;
  }

  // get a list of events created by a planner
  public getEvents() {
    this.http.get<{ message: string, events: EventCard[] }>(this.url + 'event/get')
      .subscribe((recievedData) => {
        console.log(recievedData.events);
        this.events = recievedData.events;
        this.eventsUpdated.next([...this.events]);
      });
  }

    // get a list of all published open events for homepage
    public getOpenEvents() {
      this.http.get<{ message: string, events: EventCard[] }>(this.url + 'event/open/get')
        .subscribe((recievedData) => {
          if ( recievedData.events.length) {
            console.log(recievedData.events);
            this.openEvents = recievedData.events;
            this.openEventsUpdated.next([...this.events]);
          }
        });
    }

  // get a specific event details using ID
  public getEvent(eventId: string) {
    this.http.get<{ message: string, event: TheEvent }>(this.url + 'event/get/' + eventId)
      .subscribe((recievedData) => {
        console.log(recievedData.event);
        this.event = recievedData.event;
        this.eventUpdated.next(this.event);
      });
  }

  // get event categories list
  public getEventCategories() {
    this.http.get<{ message: string, categories: EventCategory[] }>(this.url + 'event/cat/get')
      .subscribe((recievedData) => {
        console.log(recievedData.categories);
        this.eventCategories = recievedData.categories;
        this.eventCategoriesUpdated.next([...this.eventCategories]);
      });
  }

  // get a specific event category
  public getEventCategory(catId: string) {
    this.http.get<{ message: string, category: EventCategory }>(this.url + 'event/cat/get/' + catId)
      .subscribe((recievedData) => {
        console.log(recievedData.category);
        this.eventCategory = recievedData.category;
        this.eventCategoryUpdated.next(this.eventCategory);
      });
  }

  // get a list of scheduled task alerts
  public getAlerts(id: string) {
    this.http.get<{ message: string, alerts: ScheduleAlert[] }>(this.url + 'event/alerts/get/' + id)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.recievedAlerts = recievedData.alerts;
        this.alertsUpdated.next([...this.recievedAlerts]);
      });
  }


  // creating an evnt category
  public createCategory(eventCategory: EventCategory, categoryImage: File) {
    if (categoryImage) {
      const catImage = new FormData();
      catImage.append('images[]', categoryImage, categoryImage.name);
      console.log(catImage);
      this.http.post<{ imagePath: string }>(this.url + 'event/img/add', catImage)
        .subscribe((recievedImage) => {
          if (recievedImage) {
            eventCategory.img = recievedImage.imagePath;
          }
          this.http.post<{ message: string }>(this.url + 'event/cat/add', eventCategory)
            .subscribe((recievedData) => {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['/admin/categories']);
              this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
            });
        });
    } else {
      this.http.post<{ message: string }>(this.url + 'event/cat/add', eventCategory)
        .subscribe((recievedData) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/admin/categories']);
          this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
        });
    }
  }

  // removing an event category
  public removeCategory(id: string) {
    this.http.post<{ message: string }>(this.url + 'event/cat/remove', id)
      .subscribe((recievedData) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/categories']);
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
      });
  }

  // creating a new event
  public createEvent(event: TheEvent, image: File) {
    if (image) {
      console.log('image uploading');
      const newImages = new FormData();
      newImages.append('images[]', image, image.name);

      this.http.post<{ imagePath: string }>(this.url + 'event/img/add', newImages)
        .subscribe((recievedImages) => {
          event.feature_img = recievedImages.imagePath;
          this.http.post<{ message: string }>(this.url + 'event/add', event)
            .subscribe((recievedData) => {
              this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['/planner']);
            });
        });
    } else {
      this.http.post<{ message: string }>(this.url + 'event/add', event)
        .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner']);
        });
    }
  }

  // updating the event basic details (not it's services or product categories)
  public updateEvent(event: TheEvent, image: File) {
    // if budget changed in event plan event segments should be updated
    if (image) {
      const newImages = new FormData();
      newImages.append('images[]', image, image.name);

      this.http.post<{ imagePath: string }>(this.url + 'event/img/add', newImages)
        .subscribe((recievedImages) => {
          if (recievedImages.imagePath) {
            event.feature_img = recievedImages.imagePath;
          }
          this.http.post<{ message: string }>(this.url + 'event/edit', event)
            .subscribe((recievedData) => {
              this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['/planner/events']);
            });
        });
    } else {
      this.http.post<{ message: string }>(this.url + 'event/edit', event)
        .subscribe((recievedData) => {
          this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/planner/events']);
        });
    }
  }

  // cancel an event
  // PROTOCOL
  // event state will be changed to cancelled
  // all pending servies and prodcuts will be sent with cancell requests
  // all participants will be sent a cancellation notice
  public cancelEvent(eventId: string) {
    this.http.post<{ message: string }>(this.url + 'event/remove', eventId)
      .subscribe((recievedData) => {
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner']);
      });
  }


  // create new alert
  public createAlert() {
    // this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  }


  // add new scheduled task as an event segment
  public createTask(newTask: Task, eventId: string) {
    this.http.post<{ message: string }>(this.url + 'event/tasks/add', { task: newTask, eventId })
      .subscribe((recievedData) => {
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/plan/' + eventId]);
      });
  }

  // update a selected task
  public updateTask(newTask: Task, eventId: string) {
    this.http.post<{ message: string }>(this.url + 'event/tasks/edit', { task: newTask, eventId })
      .subscribe((recievedData) => {
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/plan/' + eventId]);
      });
  }

  // updating all tasks, service, product changes on ngOnDestroy of event_plan
  public updateTasks(tasks: Task[], eventId: string) {
    this.http.post<{ message: string }>(this.url + 'event/plan/update', { tasks, eventId })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/plan/' + eventId]);
      });
  }

  // update all invitation, participant changess on OnDestroy of event_participants
  public updateParticipantChanges(participants: Participant[], invitation: Alert, eventId: string) {
    this.http.post<{ message: string }>(this.url + 'event/participants/update', { participants, invitation, eventId })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
      });
  }

   // rregister a new participant to open type event
   public registerOpenEventParticipant(participant: RegistrationForm, eventId: string  ) {
    this.http.post<{ message: string }>(this.url + 'event/participants/open/add', {participant, eventId})
      .subscribe((recievedData) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/']);
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
      });
  }

  // publish event
  // PROTOCOL
  // Event state changed to 'published'
  // All participants are sent the last modified invitation
  // proceed all stated service, product requests
  public publishEvent(eventId: string) {
    this.http.get<{ message: string }>(this.url + 'event/publish/' + eventId )
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, { data: { message: recievedData.message } });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/planner/event/details/' + eventId]);
      });
  }


  // obsrver pattern : listeners
  public getEventsUpdatedListener() {
    return this.eventsUpdated.asObservable();
  }

  public getEventUpdatedListener() {
    return this.eventUpdated.asObservable();
  }


  public getEventCategoryUpdatedListener() {
    return this.eventCategoryUpdated.asObservable();
  }

  public getEventCategoriesUpdatedListener() {
    return this.eventCategoriesUpdated.asObservable();
  }

  public getalertsUpdatedListener() {
    return this.alertsUpdated.asObservable();
  }

  public getOpenEventsUpdatedListener() {
    return this.openEventsUpdated.asObservable();
  }

}
