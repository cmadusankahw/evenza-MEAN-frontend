import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-appointments',
  templateUrl: './dash-appointments.component.html',
  styleUrls: ['./dash-appointments.component.scss']
})
export class DashAppointmentsComponent implements OnInit {

  pending = 1;
  approved = 2;
  cancelled = 3;

  constructor() { }

  ngOnInit() {
  }

}
