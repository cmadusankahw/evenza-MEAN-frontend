import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { printData } from 'src/app/modules/eventplanner/eventplanner.model';
import { ServiceOrderRequest, BookingReport } from '../../serviceprovider.model';
import { ServiceProviderService } from '../../serviceprovider.service';
import { Subscription } from 'rxjs';

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
  bookingData: BookingReport[] = [];

  // printing : tried not working
  // @ViewChild('iframe', { static: true }) iframe: ElementRef;
  // ngAfterViewInit() {
  //   let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
  //   document.getElementById('aaa').innerHTML = doc;
  // }

  // total amounts
  public total_amount_paid = 0;
  public total_amount = 0;
  public total_due = 0;

  constructor(private serviceProviderService: ServiceProviderService) { }


  ngOnInit() {
    // get data from backend for report generation
    if ( this.serviceOrder) {
    this.serviceProviderService.getServiceOrderReport(this.serviceOrder.from_date.toISOString(),this.serviceOrder.to_date.toISOString());
    this.reportSub = this.serviceProviderService.getBookingreportUpdatedListener()
      .subscribe((data: BookingReport[]) => {
        this.bookingData = data;
        console.log(this.bookingData);
        for (let p of this.bookingData) {
          this.total_amount += p.amount;
          this.total_amount_paid += p.amount_paid;
          this.total_due += (p.amount - p.amount_paid);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }


  // print the report
  public printReport(content: string, title: string) {
    printData(content, title);
  }

  // email report
  public emailReport(content: string) {

  }



}
