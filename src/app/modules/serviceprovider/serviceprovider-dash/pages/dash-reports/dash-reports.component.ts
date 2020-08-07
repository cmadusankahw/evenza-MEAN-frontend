import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceOrderRequest } from '../../../serviceprovider.model';
import { ServiceProviderService } from '../../../serviceprovider.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash-reports',
  templateUrl: './dash-reports.component.html',
  styleUrls: ['./dash-reports.component.scss']
})
export class DashReportsComponent implements OnInit, OnDestroy {

  private spSub: Subscription;

  public tday = new Date();

  // recieved service names
  public spnames: any[] = [];

  // common queries
  public fromDate =  new Date();
  public toDate =  new Date();

  // report view changer
  public selectedSOReport = 1;
  public selectedSAReport = 1;
  public selectedSDReport = 1;
  public selectedBFReport = 1;

  // service order report
  public serviceOrder: ServiceOrderRequest = {
    from_date: new Date().toISOString(),
    to_date: new Date().toISOString(),
    service_category: null,
    service_id: null,
    user_id:  null,
    event_id: null,
    homeTown:  null, // event location
    rating: 0,
    amount: 0,
    sort:  null,
    group:  null
  }

  constructor(private serviceProviderService: ServiceProviderService, private router: Router) { }

  ngOnInit() {
    this.serviceProviderService.getSpNames();
    this.spSub = this.serviceProviderService.getSpNamesupdatedListener()
    .subscribe( (data: any) => {
      this.spnames = data;
    });

  }

  ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
  }


  public getServiceOrderReport() {

  }

  public getServiceAppointReport() {

  }

  public getPaymentHistoryreport() {

  }

  public getRatingReviewReport() {

  }

  public getServiceDetailsReport() {

  }

}
