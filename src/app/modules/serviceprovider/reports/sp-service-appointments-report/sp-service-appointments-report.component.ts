import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ServiceAppointRequest, AppointmentReport } from '../../serviceprovider.model';
import { Subscription } from 'rxjs';
import { ServiceProviderService } from '../../serviceprovider.service';
import { printCanvas } from 'src/app/modules/admin/admin.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from 'src/app/modules/admin/admin.service';




@Component({
  selector: 'app-sp-service-appointments-report',
  templateUrl: './sp-service-appointments-report.component.html',
  styleUrls: ['./sp-service-appointments-report.component.scss']
})
export class SpServiceAppointmentsReportComponent implements OnInit, OnDestroy {

  private reportSub: Subscription;

  // imported query data
  @Input() public ServiceAppoint: ServiceAppointRequest;

  // fetched booking related details
  public appointData: AppointmentReport[] = [];

  // report URL for emailing
  public reportUrl: string;

  // state based data
  public pending: AppointmentReport[] = [];
  public confirmed: AppointmentReport[] = [];
  public cancelled: AppointmentReport[] = [];

  // service provider ID
  @Input() public spId: string;

  // chat URLs
  url1: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=9a37a9a2-a0b2-4d5b-b0c2-92a8d8b5835f&theme=light&showAttribution=false&autoRefresh=3000";
  url2: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=4c6f550d-dfdf-4161-a9a0-b31cbbe00d6f&theme=light&showAttribution=false&autoRefresh=3000";
  url3: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=b733dc7c-d6ee-4216-b955-9a1020ca5d52&theme=light&showAttribution=false&autoRefresh=3000";

  constructor(private serviceProviderService: ServiceProviderService,
              public sanitizer: DomSanitizer, private adminService: AdminService) { }

  ngOnInit() {
    // get data from backend for report generation
    if (this.ServiceAppoint) {
      this.serviceProviderService.getServiceAppointReport(this.ServiceAppoint.from_date.toISOString(),
        this.ServiceAppoint.to_date.toISOString());
      this.reportSub = this.serviceProviderService.getAppointreportUpdatedListener()
        .subscribe((data: AppointmentReport[]) => {
          this.appointData = data;
          for (const p of this.appointData) {
            if (p.state === 'pending') {
              this.pending.push(p);
            }
            if (p.state === 'confirmed') {
              this.confirmed.push(p);
            }
            if (p.state === 'cancelled') {
              this.cancelled.push(p);
            }
          }

          this.url1 = this.sproviderFilter(this.url1);
          this.url2 = this.sproviderFilter(this.url2);
          this.url3 = this.sproviderFilter(this.url3);
        });
      console.log(this.ServiceAppoint);
    }
  }

  ngOnDestroy() {
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }

  // applying report filters
  sproviderFilter(url: string) {
    const queryString = '&filter={"serviceProvider.serviceProvider_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // print the report
  public printReport(content: string, title: string) {
    this.reportUrl = printCanvas('abc', title);
  }

  // email report
  public emailReport(attachment: string, title: string) {
    this.adminService.emailReport(attachment, title);
  }



}
