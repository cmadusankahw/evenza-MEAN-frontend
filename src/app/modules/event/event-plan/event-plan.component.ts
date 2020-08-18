import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

import { TheEvent, Service, Task, Product, Category } from '../event.model';
import { ProductService } from '../../product/product.service';
import { ServiceService } from '../../service/service.service';

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

  // product, service categories before order/book
  productCategories: Category[] = [];
  serviceCategories: Category[] = [];

  // task is editable
  editTask = false;

  // selected task
  selectedTask: Task;

  // spent budget
  spentBudget = 0;

  // slider configuration
  sliderColor: 'blue';

  // generating today date
  today = new Date().toISOString();

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private serviceService: ServiceService,
              private productService: ProductService) {
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
        this.productCategories = recievedData.product_categories;
        this.serviceCategories = recievedData.service_categories;
        console.log(this.tasks);
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


  // make task able to update
  updateTask(task: Task) {
    this.selectedTask = task;
    this.editTask = true;
  }

  //  mark a task removed on runtime
  removeTask(task: Task) {
    const updatedTasks = this.tasks.filter(t => t.task_id !== task.task_id);
    this.tasks = updatedTasks;
  }

  // update event  changes at the end - onDestroy
  updateEventChanges(tasks: Task[], eventId: string) {
    this.eventService.updateTasks(tasks, eventId);
  }

  // functions to select or add new service/ product to the list

  emitEvent(eventId: string) {
    // pass date to be used in service filter view
    this.eventService.setSelectedEvent(eventId);
  }



  emitItems(category: string, budget: number, eventId: string) {
    // pass date to be used in services filter view
    this.eventService.setSelectedFilteration({ category, allocated_budget: budget, eventId });
  }


  // get budget allocation
  getAllocation(precentage: number): number {
    return Math.round((this.event.total_budget * precentage) / 100);
  }

  // set emitted task into tasks list
  setTask(event: any) {
    let index: number;
    for (const t of this.tasks) {
      if (t.task_id === event.task_id) {
        index = this.tasks.indexOf(t);
        console.log(index);
      }
    }
    this.tasks[index] = event;
    console.log(this.tasks);
  }


  // get the remining budget
  showRemainingBudget(total: number, spent: number): number {
    let output = 0;
    if (total - spent >= 0) {
      output = (total - spent);
    }
    return output;
  }

  // set service to view dtails
   sendService(service) {
    this.serviceService.setService(service);
  }

   // set product to view dtails
   sendProduct(product) {
    this.productService.setProduct(product);
  }



}
