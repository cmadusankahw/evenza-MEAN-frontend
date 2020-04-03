import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-bookings',
  templateUrl: './dash-bookings.component.html',
  styleUrls: ['./dash-bookings.component.scss']
})
export class DashBookingsComponent implements OnInit {

  pending = 1;
  conformed = 2;
  cancelled = 3;

  constructor() { }

  ngOnInit() {
  }

}
