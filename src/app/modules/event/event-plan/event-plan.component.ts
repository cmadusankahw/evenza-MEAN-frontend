import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

import { TheEvent, Service, Task, Product } from '../event.model';
import { ThemePalette } from '@angular/material';

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

  // task is editable
  editTask = false;

  // selected task
  selectedTask: Task ;

  // spent budget
  spentBudget = 0;

  // slider configuration
  sliderColor: 'blue';

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
      this.calcSpentBudget();
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

  calcSpentBudget(){
    this.spentBudget += this.products.map(o => o.spent_budget).reduce((a, c) => a + c);
    this.spentBudget += this.services.map(o => o.spent_budget).reduce((a, c) => a + c);
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.editTask = true;
  }

  removeTask() {

  }

  updateEventSegments(event: TheEvent) {
    // when th budgets are changed, service or product category is added
    // this.eventService.updateEvent();
  }

  emitService(catgory: string, budget: number) {
    const location = this.event.location;
    // pass date to be used in service filter view
  }

  emitProduct(catgory: string, budget: number) {
    // pass date to be used in products filter view
  }

  emitServices(budget: number) {
    const location = this.event.location;
    // pass date to be used in services filter view
  }

  emitProducts(budget: number) {
    // pass date to be used in products filter view
  }

}
