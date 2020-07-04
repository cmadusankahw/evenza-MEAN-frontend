import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OpenDays } from 'src/app/modules/auth/auth.model';

@Component({
  selector: 'app-business-open-days',
  templateUrl: './business-open-days.component.html',
  styleUrls: ['./business-open-days.component.scss']
})
export class BusinessOpenDaysComponent implements OnInit {

  // editable open times
  @Input() editmode;

  @Output() availableDaysEmitter = new EventEmitter<OpenDays[]>();

  @Input() openDays: OpenDays[];

  // days of tthe week
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday' , 'Friday' ,'Saturday','Sunday'];

  // time values
  times = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];

  // timepicker
  time = {hour: 13, minute: 30};
  meridian = true;

  constructor() { }

  ngOnInit() {
  }

  // send modal data back to parent component
  updateDates() {
    this.availableDaysEmitter.emit(this.openDays);
    console.log(this.openDays);
  }

}
