import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {

  bookingCounts: any;
  bookingDates: any;
  appointDates: any;

  constructor() { }

  ngOnInit() {
  }

  setCounts(event) {
    this.bookingCounts = event;
    console.log(this.bookingCounts);
  }

  setDates(event) {
    this.bookingDates = event;
    console.log(this.bookingDates);
  }


  setAppointDates(event) {
    this.appointDates = event;
    console.log(this.appointDates);
  }


}
