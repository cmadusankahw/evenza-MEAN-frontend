import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Input() isowner = false;

  // edit mode
  editmode = false;

  // recieved event
  event: Event ;

  constructor() { }

  ngOnInit() {
    // get events
  }

}
