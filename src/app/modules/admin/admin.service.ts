import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Admin } from '../auth/auth.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';
import { BookingData, OrderData, PaymentData, DashboardData } from './admin.model';

@Injectable({providedIn: 'root'})
export class AdminService {
  private bookingDataUpdated = new Subject<BookingData>();
  private orderDataUpdated = new Subject<OrderData>();
  private paymentsUpdated = new Subject<PaymentData[]>();
  private adminUpdated = new Subject<Admin>();
  private dashboardDataUpdated = new Subject<DashboardData>();

  // to get merchant/event planner once logged in
  private admin: Admin;

  private dashboardData: DashboardData;

  private paymentData: PaymentData[];

  url = 'http://localhost:3000/api/';



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


}
