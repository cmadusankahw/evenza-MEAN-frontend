import { Component, OnInit } from '@angular/core';

import { PayStat } from '../../../seller.model';

@Component({
  selector: 'app-seller-pay-stat',
  templateUrl: './seller-pay-stat.component.html',
  styleUrls: ['./seller-pay-stat.component.scss']
})
export class SellerPayStatComponent implements OnInit {

  payStat: PayStat[] = [
    { business_id: 'B-01', pay_amount: 0, pay_due_date: '12/07/2020', overdue: false,
     last_payment: 0, last_pay_date: '212/06/2020' },
  ];


  constructor() { }

  ngOnInit() {
  }

}
