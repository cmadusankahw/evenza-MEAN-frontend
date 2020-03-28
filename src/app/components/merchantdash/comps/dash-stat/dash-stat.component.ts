import { Component, OnInit } from '@angular/core';

export interface DashStat {
  business_id: string;
  merchant_id: string;
  pending_bookings: number;
  last_book_date: string;
  confirmed_bookings: number;
  last__confirmed_book_date: string;
  pending_appointments: number;
  last_appointment_date: string;
  approved_appointments: number;
  last_approved_appointment_date: string;
}

@Component({
  selector: 'app-dash-stat',
  templateUrl: './dash-stat.component.html',
  styleUrls: ['./dash-stat.component.scss']
})
export class DashStatComponent implements OnInit {

  dashStat: DashStat[] = [
    {business_id: 'B-01',
    merchant_id: 'M-01',
    pending_bookings: 3,
    last_book_date: '22/03/2020',
    confirmed_bookings: 5,
    last__confirmed_book_date: '20/03/2020',
    pending_appointments:4,
    last_appointment_date: '11/02/2020',
    approved_appointments: 1,
    last_approved_appointment_date: '13/03/2020'
  },
  ];

  constructor() { }

  ngOnInit() {
  }

}
