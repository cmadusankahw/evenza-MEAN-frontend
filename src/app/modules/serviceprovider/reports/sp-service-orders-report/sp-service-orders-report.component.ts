import { Component, OnInit, Input } from '@angular/core';
import { printData } from 'src/app/modules/eventplanner/eventplanner.model';
import { ServiceOrderRequest } from '../../serviceprovider.model';

@Component({
  selector: 'app-sp-service-orders-report',
  templateUrl: './sp-service-orders-report.component.html',
  styleUrls: ['./sp-service-orders-report.component.scss']
})
export class SpServiceOrdersReportComponent implements OnInit {

  // report query
  @Input() public serviceOrder: ServiceOrderRequest;

  constructor() { }

  ngOnInit() {
  }

  // print the report
  public printReport(content: string, title: string) {
    printData(content,title);
  }

  // email report
  public emailReport(content: string) {

  }

}
