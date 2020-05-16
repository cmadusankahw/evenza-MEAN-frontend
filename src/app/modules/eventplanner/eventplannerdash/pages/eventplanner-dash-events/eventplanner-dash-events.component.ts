import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventplanner-dash-events',
  templateUrl: './eventplanner-dash-events.component.html',
  styleUrls: ['./eventplanner-dash-events.component.scss']
})
export class EventplannerDashEventsComponent implements OnInit {

  // show instruction cards
  showCards = true;

  constructor() { }

  ngOnInit() {
  }

}
