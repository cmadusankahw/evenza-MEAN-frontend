import { Component, OnInit, Input } from '@angular/core';
import { printData } from 'src/app/modules/eventplanner/eventplanner.model';
import { PaymentHistoryRequest } from '../../serviceprovider.model';

@Component({
  selector: 'app-sp-payments-report',
  templateUrl: './sp-payments-report.component.html',
  styleUrls: ['./sp-payments-report.component.scss']
})
export class SpPaymentsReportComponent implements OnInit {

  @Input() public paymentEarning: PaymentHistoryRequest;

  constructor() { }

  ngOnInit() {
  }

  // print the report
  public printReport(content: string, title: string) {
    printData(content, title);
  }

  // email report
  public emailReport(content: string) {

  }

}
