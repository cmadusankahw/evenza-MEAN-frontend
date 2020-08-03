import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TheEvent, Category, Product, Service } from '../event.model';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

  serviceDisplayedColumns: string[] = [ 'service_name', 'category',  'state', 'action'];
  productDisplayedColumns: string[] = [ 'product', 'category',  'state', 'action'];
  productDataSource: MatTableDataSource<any[]>;
  serviceDataSource: MatTableDataSource<any[]>;

  @Input() isowner = true;

  // subscriptions
  private eventSub: Subscription;

  // edit mode
  editmode = false;

  // event id
  eventId: string;

  // recieved event
  event: TheEvent ;

  // products of the event
  products = [];

  // services allocated with the event
  services = [];

  constructor(private eventService: EventService, private route: ActivatedRoute) {
    this.eventId = route.snapshot.params.id;
   }

  ngOnInit() {
    // get event
    this.eventService.getEvent(this.eventId);
    this.eventSub = this.eventService.getEventUpdatedListener()
      .subscribe((recievedData: TheEvent) => {
      this.event = recievedData;
      if (recievedData.event_segments.services) {
        this.services = recievedData.event_segments.services;
      }
      if (recievedData.event_segments.products) {
        this.products = recievedData.event_segments.products;
      }
      console.log(this.event);
      this.productDataSource = new MatTableDataSource(this.products);
      this.serviceDataSource = new MatTableDataSource(this.services);
    });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

  // publish the event
  publishEvent(eventId: string){
    this.eventService.publishEvent(eventId);
  }

  // cancel event
  cancelEvent() {
    this.eventService.cancelEvent(this.event.event_id);
  }


}
