import { Component, OnInit, Input } from '@angular/core';
import { ServiceAppointRequest, BookingReport } from '../../serviceprovider.model';
import { printData } from 'src/app/modules/eventplanner/eventplanner.model';
import { Subscription } from 'rxjs';
import { ServiceProviderService } from '../../serviceprovider.service';



@Component({
  selector: 'app-sp-service-appointments-report',
  templateUrl: './sp-service-appointments-report.component.html',
  styleUrls: ['./sp-service-appointments-report.component.scss']
})
export class SpServiceAppointmentsReportComponent implements OnInit {

  private reportSub: Subscription;

  // imported query data
  @Input() public ServiceAppoint: ServiceAppointRequest;

  // fetched booking related details
  bookingData: BookingReport[] = [];

  constructor(private serviceProviderService: ServiceProviderService) { }

  ngOnInit() {
    // get data from backend for report generation
    // this.serviceProviderService.getServiceOrderReport();
    this.reportSub = this.serviceProviderService.getBookingreportUpdatedListener()
      .subscribe( (data: BookingReport[]) => {
        this.bookingData = data;
      });
    console.log(this.ServiceAppoint);
  }

     // print the report
     public printReport(content: string, title: string) {
      printData('abc', title);
    }

    // email report
    public emailReport(content: string) {

    }

}
