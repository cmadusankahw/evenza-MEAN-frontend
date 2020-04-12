import { Component, OnInit } from '@angular/core';

export interface PayStat {
  business_id: string;
  pay_amount: number;
  pay_due_date: string;
  overdue: boolean;
  last_payment: number;
  last_pay_date: string;
}

@Component({
  selector: 'app-seller-pay-stat',
  templateUrl: './seller-pay-stat.component.html',
  styleUrls: ['./seller-pay-stat.component.scss']
})
export class SellerPayStatComponent implements OnInit {

  payStat: PayStat[] = [
    { business_id: 'B-01', pay_amount: 123.55, pay_due_date: '22/04/2020', overdue: true,
     last_payment: 11.34, last_pay_date: '22/03/2020' },
  ];


  constructor() { }

  ngOnInit() {
  }

}
