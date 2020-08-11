import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AdminService } from 'src/app/modules/admin/admin.service';
import { MerchantPayments, PaymentData } from 'src/app/modules/admin/admin.model';

declare let paypal: any;

@Component({
  selector: 'app-pay-stat',
  templateUrl: './pay-stat.component.html',
  styleUrls: ['./pay-stat.component.scss']
})
export class PayStatComponent implements OnInit {

  displayedColumns: string[] = ['Year', 'Month', 'due', 'paid'];
  dataSource: MatTableDataSource<PaymentData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  // recieved payment history
  myPayments: MerchantPayments;

  // last month payments
  public total_paid = 0;
  public due_amount = 0;
  public payPalAmount = 0;
  public due_date: string = new Date().toISOString().slice(0, 10);

  // for payments
  pay_amount = 0;

  subscription = 299;


  // paypal integration
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ASFjH19PwcA-QJn05nR3Lh2g_T3LJtEfX8NnXXTCNvlNgA5zri1wOOUoDzCdFNPYOC3SM2YfKNR8HvAg',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.payPalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        // make order if the payment is successed
        document.getElementById('placeOrder').click();
      });
    }
  };

  addScript = false;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getMerchantPayment();
    this.adminService.getMerchantPaymentUpdateListener()
      .subscribe((res: MerchantPayments) => {
        console.log(res);
        this.myPayments = res;
        this.dataSource = new MatTableDataSource(this.myPayments.pays);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getLastMonthPayment();
      });
  }

  // calculae total pay & due amount
  getLastMonthPayment() {
    for (const p of this.myPayments.pays) {
      this.due_date = p.timestamp.year + '-' + p.timestamp.month + '-' + '28';
      this.total_paid += p.paid_amount;
      this.due_amount += p.due_amount;
    }
    this.pay_amount = this.due_amount;
  }


  addPaypal() {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paybtn');
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scriptTagelement = document.createElement('script');
      scriptTagelement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagelement.onload = resolve;
      document.body.appendChild(scriptTagelement);
    });
  }

  // make payment
  makePayment(amount: number) {
    this.adminService.makePayment(amount);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
