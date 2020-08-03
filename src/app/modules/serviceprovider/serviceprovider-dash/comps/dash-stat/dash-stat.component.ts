import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { DashStat, Appointment } from '../../../serviceprovider.model';
import { ServiceProviderService } from '../../../serviceprovider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash-stat',
  templateUrl: './dash-stat.component.html',
  styleUrls: ['./dash-stat.component.scss']
})
export class DashStatComponent implements OnInit, OnDestroy {

  // subscribers
  private reportStatSub: Subscription;
  private dashStatSub: Subscription;

  // dashboard counts
  dashCounts: DashStat;


  constructor(private serviceProviderService: ServiceProviderService ) { }

  ngOnInit() {
   this.serviceProviderService.getReportStat();
   this.reportStatSub = this.serviceProviderService.getReportStatUpdatedListener()
          .subscribe((recievedData: boolean) => {
            if(recievedData) {
              this.serviceProviderService.getDashStat();
              this.dashStatSub = this.serviceProviderService.getDashStatUpdatedListener()
              .subscribe ( (recievedStat: DashStat) => {
                this.dashCounts = recievedStat;
                console.log(this.dashCounts);
              })
            }
      });
  }

  ngOnDestroy() {
    if (this.dashStatSub) {
      this.dashStatSub.unsubscribe();
    }
    if (this.reportStatSub) {
      this.reportStatSub.unsubscribe();
    }
  }



}
