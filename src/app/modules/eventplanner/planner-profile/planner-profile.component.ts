import { Component, OnInit, Input } from '@angular/core';

import { EventPlanner } from '../eventplanner.model';

@Component({
  selector: 'app-planner-profile',
  templateUrl: './planner-profile.component.html',
  styleUrls: ['./planner-profile.component.scss']
})
export class PlannerProfileComponent implements OnInit {

   // edit profile mode
   editmode = false;

   // recieved event planner
   eventPlanner: EventPlanner;

  constructor() { }

  ngOnInit() {
  }

  convertDate(dob) {
    const m = Number(dob.slice(0, 2)) - 1;
    const d = Number(dob.slice(3, 5));
    const y = Number(dob.slice(6, 10));
    const date = new Date(y, m, d);
    return date;
  }


}
