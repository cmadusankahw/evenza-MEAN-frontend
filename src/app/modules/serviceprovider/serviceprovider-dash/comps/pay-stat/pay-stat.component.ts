import { Component, OnInit } from '@angular/core';

import { PayStat } from '../../../serviceprovider.model';
import { AdminService } from 'src/app/modules/admin/admin.service';
import { MerchantPayments } from 'src/app/modules/admin/admin.model';

@Component({
  selector: 'app-pay-stat',
  templateUrl: './pay-stat.component.html',
  styleUrls: ['./pay-stat.component.scss']
})
export class PayStatComponent implements OnInit {

  // recieved payment history
  myPayments: MerchantPayments;

  // last month payments
  total_paid: number = 0;
  due_amount: number = 0;
  due_date: string = new Date().toISOString().slice(0, 10);

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getMerchantPayment();
    this.adminService.getMerchantPaymentUpdateListener()
    .subscribe ( (res: MerchantPayments) => {
      console.log(res);
      this.myPayments = res;
      this.getLastMonthPayment();
    });
  }

  getLastMonthPayment() {
    for ( const p of this.myPayments.pays) {
      this.due_date = p.timestamp.year + '-' + p.timestamp.month + '-' + '30';
      this.total_paid += p.paid_amount;
      this.due_amount = p.due_amount;
    }
  }
}
