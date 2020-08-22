import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PaymentHistoryRequest } from '../../serviceprovider.model';
import { ServiceProviderService } from '../../serviceprovider.service';
import { Subscription } from 'rxjs';
import {  MerchantPayments, findMonth, printCanvas } from 'src/app/modules/admin/admin.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from 'src/app/modules/admin/admin.service';

@Component({
  selector: 'app-sp-payments-report',
  templateUrl: './sp-payments-report.component.html',
  styleUrls: ['./sp-payments-report.component.scss']
})
export class SpPaymentsReportComponent implements OnInit, OnDestroy {
  private paySub: Subscription;

  @Input() public paymentEarning: PaymentHistoryRequest;

  public totalearnings = 0;
  public totalPayments = 0;

  // recieved details
  pays: any[] = [];
  earnings: any[] = [];

  // preparing recieved dates for comparison
  public fromDate = {month: 1, year: 2020};
  public toDate  = {month: 1, year: 2020};

  // report calculations
  public total_amount = 0;
  public total_amount_paid  = 0;
  public total_due = 0;

  // report URL for emailing
  public reportUrl: string;


  // service provider ID
  @Input() public spId: string;

  // chat URLs
  url1: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=8f1dde2f-6427-429e-864b-42384d914906&autoRefresh=3000&theme=light";
  url2: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=eb88acb5-759a-4b68-8a0f-422a2be098dc&autoRefresh=3000&theme=light";
  url3: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=49e05742-09d3-4cf0-8df7-965ada65927b&autoRefresh=3000&theme=light";



  constructor(private servieProviderService: ServiceProviderService,  public sanitizer: DomSanitizer, public adminService: AdminService) { }

  ngOnInit() {
    if (this.paymentEarning) {
      this.fromDate.year = Number(this.paymentEarning.from_date.toISOString().slice(0, 4));
      this.fromDate.month = Number(this.paymentEarning.from_date.toISOString().slice(5, 7));
      this.toDate.year = Number(this.paymentEarning.to_date.toISOString().slice(0, 4));
      this.toDate.month = Number(this.paymentEarning.to_date.toISOString().slice(5, 7));
    }
    console.log(this.fromDate, this.toDate);
    console.log(this.paymentEarning);

    this.servieProviderService.getPaymentEarningReport();
    this.paySub = this.servieProviderService.getPaymentsDetailsUpdatedListener()
    .subscribe( (data: { message: string, payments: MerchantPayments, earnings: any[]}) => {
      if (data.payments) {
        for ( const p of data.payments.pays) {
          if (Number(p.timestamp.year) >= this.fromDate.year && Number(p.timestamp.year) <= this.toDate.year) {
            if (Number(p.timestamp.month) >= this.fromDate.month && Number(p.timestamp.month) <= this.toDate.month) {
              this.pays.push({monthString: findMonth(Number(p.timestamp.month)), ...p});
              this.total_due += p.due_amount;
              this.total_amount_paid += p.paid_amount;
            }
          }
        }
      }

      if (data.earnings) {
        this.earnings = data.earnings;
        for ( let p of this.earnings) {
          this.total_amount += p.amount;
        }
    }
      console.log(this.pays);
      console.log(this.earnings);
      console.log(data.message);
      this.url1 = this.sproviderFilter(this.url1);
      this.url2 = this.sproviderPaymentFilter(this.url2);
      this.url3 = this.sproviderFilter(this.url3);
    });
  }

  ngOnDestroy() {
    if (this.paySub) {
      this.paySub.unsubscribe();
    }
  }

// to be modified
  public sproviderFilter(url: string) {
    const queryString = '&filter={"serviceProvider.serviceProvider_id":"'+ this.spId
    +',from_date:{$gte:' + this.paymentEarning.from_date.toISOString().slice(0,10) + '},to_date:{$lte:' +
    this.paymentEarning.to_date.toISOString().slice(0,10) + '}"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  public sproviderPaymentFilter(url: string) {
    const queryString = '&filter={"payment_details.user_id":"'+
    this.spId +',from_date:{$gte:' + this.paymentEarning.from_date.toISOString().slice(0,10) + '},to_date:{$lte:' +
    this.paymentEarning.to_date.toISOString().slice(0,10) + '}"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // print the report
  public printReport(content: string, title: string) {
    this.reportUrl = printCanvas(content, title);
    console.log(this.reportUrl);
  }

  // email report
  public emailReport(attachment: string, title: string) {
    this.adminService.emailReport(attachment, title);
  }


}
