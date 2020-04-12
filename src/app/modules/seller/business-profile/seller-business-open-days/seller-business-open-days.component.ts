import { Component, OnInit, Input } from '@angular/core';

export interface Availability {
  day: string;
  isopened: boolean;
  open_time: string;
  close_time: string;
}

@Component({
  selector: 'app-seller-business-open-days',
  templateUrl: './seller-business-open-days.component.html',
  styleUrls: ['./seller-business-open-days.component.scss']
})
export class SellerBusinessOpenDaysComponent implements OnInit {


  //editable open times
  @Input() editmode;

 availability = [
    { day: 'Monday', isopened: true, open_time: '08:00', close_time: '18:00' },
    { day: 'Tuesday', isopened: true, open_time: '08:00', close_time: '18:00' },
    { day: 'Wednesday', isopened: true, open_time: '08:00', close_time: '18:00' },
    { day: 'Thursday', isopened: true, open_time: '08:00', close_time: '18:00' },
    { day: 'Friday', isopened: true, open_time: '08:00', close_time: '18:00' },
    { day: 'Saturday', isopened: true, open_time: '08:00', close_time: '18:00' },
    { day: 'Sunday', isopened: false , open_time: '', close_time: '' },
  ];

  //timepicker
  time = {hour: 13, minute: 30};
  meridian = true;


  constructor() { }

  ngOnInit() {
  }

}
