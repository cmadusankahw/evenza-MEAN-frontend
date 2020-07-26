import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { PaymentData, MerchantPayments } from '../admin.model';


@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['user_type', 'name', 'email', 'amount_due', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<MerchantPayments>;

  payDisplayedColumns: string[] = ['year', 'month', 'paid_date', 'amount_due', 'amount_paid'];
  payDataSource: MatTableDataSource<PaymentData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private paymentDataSub: Subscription;

  // final payments list
  payments: MerchantPayments[] = [];

  // recieved state
  @Input() userType = 'serviceProvider';

  // payment arrays
  recievedPayments: MerchantPayments[] = [];

  // selected payment
  selectedPayment: MerchantPayments;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
     // get admin for child comp use
   this.adminService.getAdminPayments();
   this.paymentDataSub = this.adminService.getMerchantPaymentsUpdateListener().subscribe(
     payments => {
       if (payments) {
         this.recievedPayments = payments;
         console.log(this.recievedPayments);
         this.dataSource = new MatTableDataSource(this.addPayments(this.recievedPayments, this.userType));
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }
     });
  }

  ngOnDestroy() {

    if (this.paymentDataSub) {
      this.paymentDataSub.unsubscribe();
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // classify reieved merchant payments
  addPayments(payments: MerchantPayments[], state: string): MerchantPayments[] {
    const pendingBookings = [];
    for (const val of payments) {
      if (val.user_type === state) {
        pendingBookings.push(Object.assign({}, val));
      }
    }
    this.payments = [...pendingBookings];
    return this.payments;
  }

  // get selected payment details
  showPaymentDetails(userId: string) {
    for (const app of this.payments) {
      if (app.user_id === userId) {
        this.selectedPayment = app;
      }
    }
    this.payDataSource = new MatTableDataSource(this.selectedPayment.pays);
    this.payDataSource.paginator = this.paginator;
  }

  // get last payment details
  getLastPayData(payment: MerchantPayments): PaymentData {
    let lastPay: PaymentData;
    for (var pay of payment.pays) {
      lastPay = pay;
    }
    return lastPay;
  }

}
