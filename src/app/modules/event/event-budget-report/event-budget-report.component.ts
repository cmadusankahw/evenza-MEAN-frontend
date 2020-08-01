import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { TheEvent, Service, Product } from '../event.model';
import { printData } from '../../eventplanner/eventplanner.model';

@Component({
  selector: 'app-event-budget-report',
  templateUrl: './event-budget-report.component.html',
  styleUrls: ['./event-budget-report.component.scss']
})
export class EventBudgetReportComponent implements OnInit, OnDestroy {

  eventSub: Subscription;

  event: TheEvent;

  eventId: string;

  services: Service[] = [];

  products: Product[] = [];

  // generating today date
  today = new Date().toISOString();

  constructor(private eventService: EventService, private route: ActivatedRoute, private location: Location) {
    this.eventId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.eventService.getEvent(this.eventId);
    this.eventSub = this.eventService.getEventUpdatedListener()
      .subscribe((recievedData: TheEvent) => {
      this.event = recievedData;
      this.services = recievedData.event_segments.services;
      this.products = recievedData.event_segments.products;
      setTimeout( () => this.printEventBudget('content', 'Budget_Report'), 800);
    });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }


  // get the remining budget
  showRemainingBudget(total: number, spent: number): number {
    let output = 0;
    if (total - spent >= 0) {
      output = (total - spent);
    };
    return output;
  }

    // print event budget report
    printEventBudget(content: string, type: string) {
      printData(content, type);
    }

  backClicked() {
    this.location.back();
  }
}
