import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

import { TheEvent, Service, Task, Product } from '../event.model';

@Component({
  selector: 'app-event-plan',
  templateUrl: './event-plan.component.html',
  styleUrls: ['./event-plan.component.scss']
})
export class EventPlanComponent implements OnInit, OnDestroy {

  eventSub: Subscription;

  event: TheEvent;

  eventId: string;

  services: Service[] = [];

  tasks: Task[] = [];

  products: Product[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute) {
    this.eventId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.eventService.getEvent(this.eventId);
    this.eventSub = this.eventService.getEventUpdatedListener()
      .subscribe((recievedData: TheEvent) => {
      this.event = recievedData;
      this.tasks = recievedData.event_segments.tasks;
      this.services = recievedData.event_segments.services;
      this.products = recievedData.event_segments.products;
      console.log(this.tasks);
      console.log(this.services);
      console.log(this.products);
    });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}
