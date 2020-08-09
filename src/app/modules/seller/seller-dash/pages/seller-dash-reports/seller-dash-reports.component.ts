import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentHistoryRequest, ProductOrderRequest, ProductDetailsRequest } from '../../../seller.model';
import { SellerService } from '../../../seller.service';

@Component({
  selector: 'app-seller-dash-reports',
  templateUrl: './seller-dash-reports.component.html',
  styleUrls: ['./seller-dash-reports.component.scss']
})
export class SellerDashReportsComponent implements OnInit, OnDestroy {

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

  // prodct order report
  public productOrder: ProductOrderRequest = {
    from_date: new Date(),
    to_date: new Date(),
    order_type: null,
    product_id: null,
    rating: 0,
    amount: 0,
    sort:  null,
    group:  null
  }


     // payments and earnings report
  public paymentEarning: PaymentHistoryRequest = {
    from_date: new Date(),
    to_date: new Date(),
    product_id: null,
    payment: 0,
    earning: 0,
    due: 0,
    sort:  null,
    group:  null
  }

    // product details report
  public productDetails: ProductDetailsRequest = {
    product_id: null,
    rating: 0,
    earning: 0,
    sort:  null,
    group:  null
  }

  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit() {
    this.sellerService.getSellerNames();
    this.spSub = this.sellerService.getSelNamesupdatedListener()
    .subscribe( (data: any) => {
      this.spnames = data;
    });

    // getting service provider user id
    this.sellerService.getSelId();
    this.sellerService.getSelIdUpdatedListener()
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
