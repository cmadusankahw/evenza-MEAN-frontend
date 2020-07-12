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
      for (const segment of this.event.event_segments) {
        if (segment.segment_type === 'product') {
          this.products.push(segment.object);
        }
        if (segment.segment_type === 'service') {
          this.services.push(segment.object);
        }
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

  updateEventState(state: string) {

  }



}
