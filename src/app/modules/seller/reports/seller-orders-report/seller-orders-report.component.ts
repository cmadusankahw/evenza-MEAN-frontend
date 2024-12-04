import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { printCanvas } from 'src/app/modules/admin/admin.model';
import { ProductOrderRequest, OrderReport } from '../../seller.model';
import { SellerService } from '../../seller.service';
import { AdminService } from 'src/app/modules/admin/admin.service';

@Component({
  selector: 'app-seller-orders-report',
  templateUrl: './seller-orders-report.component.html',
  styleUrls: ['./seller-orders-report.component.scss']
})
export class SellerOrdersReportComponent implements OnInit, OnDestroy {


  private reportSub: Subscription;

  // imported query data
  @Input() public productOrder: ProductOrderRequest;

  // fetched booking related details
  public orderData: OrderReport[] = [];

  public pending: OrderReport[] = [];
  public delivered: OrderReport[] = [];
  public cancelled: OrderReport[] = [];

  // total amounts
  public total_amount_paid = 0;
  public total_amount = 0;
  public total_due = 0;

  // recieved Service Provider ID
  @Input() public spId: string;

  // report URL for emailing
  public reportUrl: string;


  // Charl URLS
  url1: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=d48e1dff-81f7-4379-91b0-4004bf86b464&autoRefresh=3600&theme=light";
  url2: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=ce416e56-0c77-4b49-8fcc-274b8446a7b3&autoRefresh=3600&theme=light";
  url3: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=bd0e2e88-c9d4-41c2-a3f4-4edfccbdb127&autoRefresh=3600&theme=light";

  constructor(private sellerService: SellerService,
              public sanitizer: DomSanitizer,
              private adminService: AdminService) { }


  ngOnInit() {
    // get data from backend for report generation
    if ( this.productOrder) {
    this.sellerService.getProductOrderReport(this.productOrder.from_date.toISOString(),this.productOrder.to_date.toISOString());
    this.reportSub = this.sellerService.getOrderreportUpdatedListener()
      .subscribe((data: OrderReport[]) => {
        this.orderData = data;
        console.log(this.orderData);
        for (let p of this.orderData) {
          this.total_amount += p.amount;
          this.total_amount_paid += p.amount_paid;
          this.total_due += (p.amount - p.amount_paid);
          if ( p.state === 'pending') {
            this.pending.push(p);
          }
          if ( p.state === 'delivered') {
            this.delivered.push(p);
          }
          if ( p.state === 'cancelled') {
            this.cancelled.push(p);
          }
        }
        this.url1 = this.sellerDateFilter(this.url1);
        this.url2 = this.sellerDateFilter(this.url2);
        this.url3 = this.sellerDateFilter(this.url3);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }

  // apply chart filters
  public sellerFilter(url: string) {
    const queryString = '&filter={"seller.seller_id":"'+ this.spId +'"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // apply report filters
  public sellerDateFilter(url: string) {
    const queryString = '&filter={"seller.seller_id":"'+ this.spId
    +'",created_date:{$gte:ISODate("' + this.productOrder.from_date.toISOString().slice(0,10) + '")}}';
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
