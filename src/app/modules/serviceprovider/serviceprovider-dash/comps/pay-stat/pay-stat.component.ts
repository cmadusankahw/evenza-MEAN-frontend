import { Component, OnInit } from '@angular/core';

import { PayStat } from '../../../serviceprovider.model';

@Component({
  selector: 'app-pay-stat',
  templateUrl: './pay-stat.component.html',
  styleUrls: ['./pay-stat.component.scss']
})
export class PayStatComponent implements OnInit {

  payStat: PayStat[] = [
    { business_id: 'B-01', pay_amount: 123.55, pay_due_date: '22/04/2020', overdue: true,
     last_payment: 11.34, last_pay_date: '22/03/2020' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
