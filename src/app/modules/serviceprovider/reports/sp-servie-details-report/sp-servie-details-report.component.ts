import { Component, OnInit, Input } from '@angular/core';
import { printData } from 'src/app/modules/eventplanner/eventplanner.model';
import { ServiceDetailsRequest } from '../../serviceprovider.model';

@Component({
  selector: 'app-sp-servie-details-report',
  templateUrl: './sp-servie-details-report.component.html',
  styleUrls: ['./sp-servie-details-report.component.scss']
})
export class SpServieDetailsReportComponent implements OnInit {

  @Input() serviceDetails: ServiceDetailsRequest;

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
