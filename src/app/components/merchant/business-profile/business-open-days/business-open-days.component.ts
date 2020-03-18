import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-open-days',
  templateUrl: './business-open-days.component.html',
  styleUrls: ['./business-open-days.component.scss']
})
export class BusinessOpenDaysComponent implements OnInit {
  opendays = true;

  constructor() { }

  ngOnInit() {
  }

}
