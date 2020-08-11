import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SuccessComponent } from 'src/app/success/success.component';
import { Admin } from '../auth/auth.model';
import { DashboardData, MerchantPayments, PaymentData } from './admin.model';
import { getUrl } from 'src/assets/url';

@Injectable({ providedIn: 'root' })
export class AdminService {
  // Observer Pattern: Subjects
  private paymentsUpdated = new Subject<PaymentData[]>();
  private adminUpdated = new Subject<Admin>();
  private dashboardDataUpdated = new Subject<DashboardData>();
  private adminPaymentsUpdated = new Subject<MerchantPayments[]>();
  private merchantPaymentUpdated = new Subject<MerchantPayments>();

  private merchantLocationUpdated = new Subject<any[]>();
  private eventLocationUpdated = new Subject<any[]>();

  // to get merchant/event planner once logged in
  private admin: Admin;
  // recieved admin dashboard status
  private dashboardData: DashboardData;
  // rcieved user payment details
  private paymentData: PaymentData[];
  // api url
  private url = getUrl();

  // payments dtails recieved
  private adminPayments: MerchantPayments[];

  // recieved merchant's payment
  private merchantPayment: MerchantPayments;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  // get methods

  // get event planner after login
  public getAdmin() {
    this.http
      .get<{ message: string; admin: Admin }>(this.url + 'admin/get/self')
      .subscribe((recievedMerchant) => {
        this.admin = recievedMerchant.admin;
        this.adminUpdated.next(this.admin);
      });
  }

  // get booking data
  public getDashBoardData() {
    this.http
      .get<{ message: string; dashboardData: DashboardData }>(
        this.url + 'admin/get/dbdata'
      )
      .subscribe((res) => {
        console.log(res);
        this.dashboardData = res.dashboardData;
        this.dashboardDataUpdated.next(this.dashboardData);
      });
  }

  // get payment data fbetween given 6 months period
  public getPaymentData(dat: { fromMonth: number; toMonth: number }) {
    this.http
      .post<{ message: string; paymntData: PaymentData[] }>(
        this.url + 'admin/get/paydata',
        dat
      )
      .subscribe((res) => {
        this.paymentData = res.paymntData;
        this.paymentsUpdated.next(this.paymentData);
      });
  }

  // get all users payment details
  public getAdminPayments() {
    this.http
      .get<{ message: string; paymentDetails: MerchantPayments[] }>(
        this.url + 'admin/get/payments'
      )
      .subscribe((res) => {
        console.log(res);
        this.adminPayments = res.paymentDetails;
        this.adminPaymentsUpdated.next([...this.adminPayments]);
      });
  }

  // get merchants' paymentss for merchant dashboards
  public getMerchantPayment() {
    this.http
      .get<{ message: string; merchantPayment: MerchantPayments }>(
        this.url + 'admin/get/payment'
      )
      .subscribe((res) => {
        console.log(res);
        this.merchantPayment = res.merchantPayment;
        this.merchantPaymentUpdated.next(this.merchantPayment);
      });
  }

  // get location data
  public getMerchantLocation() {
    this.http
      .get<{ locations: any[] }>(this.url + 'admin/get/location/m')
      .subscribe((res) => {
        console.log(res);
        this.merchantLocationUpdated.next(res.locations);
      });
  }

  // get location data
  public getEventLocation() {
    this.http
      .get<{ locations: any[] }>(this.url + 'admin/get/location/e')
      .subscribe((res) => {
        console.log(res);
        this.eventLocationUpdated.next(res.locations);
      });
  }

  // setters

  // create a new backup of database
  public createBackup() {
    this.http
      .get<{ message: string }>(this.url + 'admin/backup/create')
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // restore from a created backup
  public restoreBackup(path: string) {
    this.http
      .post<{ message: string }>(this.url + 'admin/backup/restore', { path })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // collect service provider payment
  public makePayment(amount: number) {
    this.http
      .post<{ message: string }>(this.url + 'admin/make/payment', { amount })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // email business reports
  public emailReport(attachment: string, title: string) {
    this.http
      .post<{ message: string }>(this.url + 'admin/report/mail', {
        attachment,
        title,
      })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // observer pattern: listners for subjects

  public getAdminUpdateListener() {
    return this.adminUpdated.asObservable();
  }

  public getDashboardDataUpdateListener() {
    return this.dashboardDataUpdated.asObservable();
  }

  public getPaymentDataUpdateListener() {
    return this.paymentsUpdated.asObservable();
  }

  public getMerchantPaymentsUpdateListener() {
    return this.adminPaymentsUpdated.asObservable();
  }

  public getMerchantPaymentUpdateListener() {
    return this.merchantPaymentUpdated.asObservable();
  }

  public getMerchantLocationUpdateListener() {
    return this.merchantLocationUpdated.asObservable();
  }

  public getEventLocationUpdateListener() {
    return this.eventLocationUpdated.asObservable();
  }
}
