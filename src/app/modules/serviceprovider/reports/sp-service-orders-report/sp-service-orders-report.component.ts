import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ServiceOrderRequest, BookingReport } from '../../serviceprovider.model';
import { ServiceProviderService } from '../../serviceprovider.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { printCanvas } from 'src/app/modules/admin/admin.model';
import { AdminService } from 'src/app/modules/admin/admin.service';

@Component({
  selector: 'app-sp-service-orders-report',
  templateUrl: './sp-service-orders-report.component.html',
  styleUrls: ['./sp-service-orders-report.component.scss']
})
export class SpServiceOrdersReportComponent implements OnInit, OnDestroy {

  private reportSub: Subscription;

  // imported query data
  @Input() public serviceOrder: ServiceOrderRequest;

  // fetched booking related details
  public bookingData: BookingReport[] = [];

  // report URL for emailing
  public reportUrl: string;

  public pending: BookingReport[] = [];
  public completed: BookingReport[] = [];
  public cancelled: BookingReport[] = [];

  // total amounts
  public total_amount_paid = 0;
  public total_amount = 0;
  public total_due = 0;

  // recieved Service Provider ID
  @Input() public spId: string;

  // Charl URLS
  url1: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=5de5c3ad-fb12-4032-a17f-6a169442cef5&theme=light&showAttribution=false&autoRefresh=3000";
  url2: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=b05302e7-f7e0-4bbe-830b-f4a19b392472&theme=light&showAttribution=false&autoRefresh=3000";
  url3: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=5b39d79c-f9d8-425b-a5a5-43ae3e5f22ea&theme=light&showAttribution=false&autoRefresh=3000";

  constructor(private serviceProviderService: ServiceProviderService,
    public sanitizer: DomSanitizer,
    public adminService: AdminService) { }


  ngOnInit() {
    // get data from backend for report generation
    if (this.serviceOrder) {
      this.serviceProviderService.getServiceOrderReport(this.serviceOrder.from_date.toISOString(), this.serviceOrder.to_date.toISOString());
      this.reportSub = this.serviceProviderService.getBookingreportUpdatedListener()
        .subscribe((data: BookingReport[]) => {
          this.bookingData = data;
          console.log(this.bookingData);
          for (let p of this.bookingData) {
            this.total_amount += p.amount;
            this.total_amount_paid += p.amount_paid;
            this.total_due += (p.amount - p.amount_paid);
            if (p.state === 'pending') {
              this.pending.push(p);
            }
            if (p.state === 'completed') {
              this.completed.push(p);
            }
            if (p.state === 'cancelled') {
              this.cancelled.push(p);
            }
          }

          this.url1 = this.sproviderDateFilter(this.url1);
          this.url2 = this.sproviderDateFilter(this.url2);
          this.url3 = this.sproviderDateFilter(this.url3);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }

  public sproviderFilter(url: string) {
    const queryString = '&filter={"serviceProvider.serviceProvider_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // apply report filters
  public sproviderDateFilter(url: string) {
    const queryString = '&filter={"serviceProvider.serviceProvider_id":"'+ this.spId
    +'",from_date:{$gte:ISODate("' + this.serviceOrder.from_date.toISOString().slice(0,10) + '")},to_date:{$lte:ISODate("' +
    this.serviceOrder.to_date.toISOString().slice(0,10) + '")}}';
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
