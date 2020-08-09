import { Component, OnInit, Input } from '@angular/core';
import { ServiceDetailsRequest } from '../../serviceprovider.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceProviderService } from '../../serviceprovider.service';
import { printCanvas } from 'src/app/modules/admin/admin.model';

@Component({
  selector: 'app-sp-servie-details-report',
  templateUrl: './sp-servie-details-report.component.html',
  styleUrls: ['./sp-servie-details-report.component.scss']
})
export class SpServieDetailsReportComponent implements OnInit {

  @Input() serviceDetails: ServiceDetailsRequest;

  // recieved Service Provider ID
  @Input() public spId: string;

  // Charl URLS
  url1 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=ce7f0a93-9d30-4076-b11c-1e1b97ad7178&autoRefresh=300&theme=light";
  url2 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=93930bc8-b974-4042-aa75-b82c21276873&autoRefresh=300&theme=light";
  url3 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=773a586c-19df-416b-ade0-4495ef82cf7c&autoRefresh=300&theme=light";
  url4 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=a03717b5-5a5a-4e01-bb91-7d5b2ce56a84&autoRefresh=300&theme=light";
  url5 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=61e3c255-ae18-4d48-9641-67dee4c93003&autoRefresh=300&theme=light";


  constructor(private serviceProviderService: ServiceProviderService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  public sproviderFilter(url: string) {
    const queryString = '&filter={"serviceProvider.serviceProvider_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  public sproviderUserFilter(url: string) {
    const queryString = '&filter={"user_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }



  // print the report
  public printReport(content: string, title: string) {
    printCanvas(content, title);
  }

  // email report
  public emailReport(content: string) {

  }


}
