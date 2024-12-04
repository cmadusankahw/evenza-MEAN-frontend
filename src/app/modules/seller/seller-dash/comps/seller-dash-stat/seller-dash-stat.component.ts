import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DashStat } from '../../../seller.model';
import { Subscription } from 'rxjs';
import { SellerService } from '../../../seller.service';

@Component({
  selector: 'app-seller-dash-stat',
  templateUrl: './seller-dash-stat.component.html',
  styleUrls: ['./seller-dash-stat.component.scss']
})
export class SellerDashStatComponent implements OnInit, OnDestroy {


  // subscribers
  private reportStatSub: Subscription;
  private dashStatSub: Subscription;


  orderCounts: DashStat;

  constructor(private sellerService: SellerService) { }

  ngOnInit() {
    this.sellerService.getreportData();
    this.reportStatSub = this.sellerService.getReportDataUpdateListener()
      .subscribe((recievedData: boolean) => {
        if (recievedData) {
          this.sellerService.getDashStat();
          this.dashStatSub = this.sellerService.getDashStatUpdateListener()
            .subscribe((recievedStat: DashStat) => {
              this.orderCounts = recievedStat;
              console.log(this.orderCounts);
            });
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
