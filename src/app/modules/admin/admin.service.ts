import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Admin } from '../auth/auth.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';
import { BookingData, OrderData, PaymentData, DashboardData, MerchantPayments } from './admin.model';

@Injectable({providedIn: 'root'})
export class AdminService {
  private bookingDataUpdated = new Subject<BookingData>();
  private orderDataUpdated = new Subject<OrderData>();
  private paymentsUpdated = new Subject<PaymentData[]>();
  private adminUpdated = new Subject<Admin>();
  private dashboardDataUpdated = new Subject<DashboardData>();
  private adminPaymentsUpdated = new Subject<MerchantPayments[]>();
  private merchantPaymentUpdated = new Subject<MerchantPayments>();

  private merchantLocationUpdated = new Subject<any[]>();
  private eventLocationUpdated = new Subject<any[]>();

  // to get merchant/event planner once logged in
  private admin: Admin;

  private dashboardData: DashboardData;

  private paymentData: PaymentData[];

  url = 'http://localhost:3000/api/';


  adminPayments: MerchantPayments[];

  // recieved merchant's payment
  merchantPayment: MerchantPayments;



  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog) {}


  // get methods


    // get event planner after login
    getAdmin() {
      this.http.get<{message: string, admin: Admin}>(this.url + 'admin/get/self')
        .subscribe((recievedMerchant) => {
          this.admin = recievedMerchant.admin;
          this.adminUpdated.next(this.admin);
      });
    }

    // get booking data
  getDashBoardData() {
    this.http.get<{message: string, dashboardData: DashboardData}>(this.url + 'admin/get/dbdata')
    .subscribe((res) => {
      console.log(res);
      this.dashboardData = res.dashboardData;
      this.dashboardDataUpdated.next(this.dashboardData);
    });
  }

  // get payment data fbetween given 6 months period
  getPaymentData(dat: {fromMonth: number, toMonth: number}) {
        this.http.post<{message: string, paymntData: PaymentData[]}>(this.url + 'admin/get/paydata', dat)
        .subscribe((res) => {
          this.paymentData   = res.paymntData;
          this.paymentsUpdated.next(this.paymentData);
        });
  }

  getAdminPayments() {
    this.http.get<{message: string, paymentDetails: MerchantPayments[]}>(this.url + 'admin/get/payments')
    .subscribe((res) => {
      console.log(res);
      this.adminPayments = res.paymentDetails;
      this.adminPaymentsUpdated.next([...this.adminPayments]);
    });
  }

  // get merchants' paymentss for merchant dashboards
  getMerchantPayment() {
    this.http.get<{message: string, merchantPayment: MerchantPayments}>(this.url + 'admin/get/payment')
    .subscribe((res) => {
      console.log(res);
      this.merchantPayment = res.merchantPayment;
      this.merchantPaymentUpdated.next(this.merchantPayment);
    });
  }

  // get location data
  getMerchantLocation() {
    this.http.get<{ locations: any[]}>(this.url + 'admin/get/location/m')
    .subscribe((res) => {
      console.log(res);
      this.merchantLocationUpdated.next(res.locations);
    });
  }


 // get location data
  getEventLocation() {
    this.http.get<{ locations: any[]}>(this.url + 'admin/get/location/e')
    .subscribe((res) => {
      console.log(res);
      this.eventLocationUpdated.next(res.locations);
    });
  }



  // listners for subjects

  getAdminUpdateListener() {
    return this.adminUpdated.asObservable();
  }


  getDashboardDataUpdateListener() {
    return this.dashboardDataUpdated.asObservable();
  }


  getPaymentDataUpdateListener() {
    return this.paymentsUpdated.asObservable();
  }


  getMerchantPaymentsUpdateListener() {
    return this.adminPaymentsUpdated.asObservable();
  }

  getMerchantPaymentUpdateListener() {
    return this.merchantPaymentUpdated.asObservable();
  }

  getMerchantLocationUpdateListener() {
    return this.merchantLocationUpdated.asObservable();
  }

  getEventLocationUpdateListener() {
    return this.eventLocationUpdated.asObservable();
  }



  // backups
  createBackup(path: string) {
    this.http.post<{ message: string }>(this.url + 'admin/backup/create', {path})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

  restoreBackup(path: string) {
    this.http.post<{ message: string }>(this.url + 'admin/backup/restore', {path})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

  // collect sprovider payment
  makePayment(amount: number) {
    this.http.post<{ message: string }>(this.url + 'admin/make/payment', {amount})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

}
