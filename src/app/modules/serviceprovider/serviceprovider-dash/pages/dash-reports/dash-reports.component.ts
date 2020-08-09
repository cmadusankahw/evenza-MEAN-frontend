import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceOrderRequest, ServiceAppointRequest, PaymentHistoryRequest, ServiceDetailsRequest } from '../../../serviceprovider.model';
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

  // serviceprovider ID
  public spId: string;

  // report view changer
  public selectedSOReport = false;
  public selectedSAReport = false;
  public selectedSDReport = false;
  public selectedPEReport = false;
  public selectedBFReport = false;

  // service order report
  public serviceOrder: ServiceOrderRequest = {
    from_date: new Date(),
    to_date: new Date(),
    booking_type: null,
    service_id: null,
    homeTown:  null, // event location
    rating: 0,
    amount: 0,
    sort:  null,
    group:  null
  }

    // service appointment report
  public serviceAppoint: ServiceAppointRequest = {
    from_date: new Date(),
    to_date: new Date(),
    appoint_type: null,
    service_id: null,
    sort:  null,
    group:  null
  }

     // payments and earnings report
  public paymentEarning: PaymentHistoryRequest = {
    from_date: new Date(),
    to_date: new Date(),
    service_id: null,
    payment: 0,
    earning: 0,
    due: 0,
    sort:  null,
    group:  null
  }

    // payments and earnings report
  public serviceDetails: ServiceDetailsRequest = {
    service_id: null,
    rating: 0,
    earning: 0,
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

    // getting service provider user id
    this.serviceProviderService.getSPId();
    this.serviceProviderService.getSpIdUpdatedListener()
      .subscribe( (data: string) => {
        this.spId = data;
        console.log(this.spId);
      });
  }

  ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
  }


}
