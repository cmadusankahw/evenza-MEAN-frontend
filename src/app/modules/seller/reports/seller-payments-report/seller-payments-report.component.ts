import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {  MerchantPayments, findMonth, printCanvas } from 'src/app/modules/admin/admin.model';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentHistoryRequest } from '../../seller.model';
import { SellerService } from '../../seller.service';
import { AdminService } from 'src/app/modules/admin/admin.service';

@Component({
  selector: 'app-seller-payments-report',
  templateUrl: './seller-payments-report.component.html',
  styleUrls: ['./seller-payments-report.component.scss']
})
export class SellerPaymentsReportComponent implements OnInit, OnDestroy {

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


  // service provider ID
  @Input() public spId: string;

  // report URL for emailing
  public reportUrl: string;

  // chat URLs
  url1: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=ec3b0d89-65df-464f-a325-ac62c631b28d&autoRefresh=3600&theme=light";
  url2: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=b02a66b3-1bf5-4799-bcf4-8337c0081731&autoRefresh=3600&theme=light";
  url3: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=f8701df1-b89e-4326-9745-8a9d8340b67c&autoRefresh=3600&theme=light";



  constructor(private sellrService: SellerService,  public sanitizer: DomSanitizer, private adminService: AdminService) { }

  ngOnInit() {
    if (this.paymentEarning) {
      this.fromDate.year = Number(this.paymentEarning.from_date.toISOString().slice(0, 4));
      this.fromDate.month = Number(this.paymentEarning.from_date.toISOString().slice(5, 7));
      this.toDate.year = Number(this.paymentEarning.to_date.toISOString().slice(0, 4));
      this.toDate.month = Number(this.paymentEarning.to_date.toISOString().slice(5, 7));
    }
    console.log(this.fromDate, this.toDate);
    console.log(this.paymentEarning);

    this.sellrService.getPaymentEarningReport();
    this.paySub = this.sellrService.getPaymentsDetailsUpdatedListener()
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

      this.url1 = this.sellerFilter(this.url1);
      this.url2 = this.sellerPaymentFilter(this.url2);
      this.url3 = this.sellerFilter(this.url3);
    });
  }

  ngOnDestroy() {
    if (this.paySub) {
      this.paySub.unsubscribe();
    }
  }

 // applying report filters
  public sellerFilter(url: string) {
    const queryString = '&filter={"seller.seller_id":"'+ this.spId +'"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // applying report filters
  public sellerPaymentFilter(url: string) {
    const queryString = '&filter={"payment_details.user_id":"'+ this.spId +'"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // print the report
  public printReport(content: string, title: string) {
    this.reportUrl = printCanvas(content, title);
  }

 // email report
 public emailReport(attachment: string, title: string) {
  this.adminService.emailReport(attachment, title);
}

}
