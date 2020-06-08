import { Component, OnInit, OnDestroy } from '@angular/core';

import { DashStat } from '../../../serviceprovider.model';
import { ServiceProviderService } from '../../../serviceprovider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash-stat',
  templateUrl: './dash-stat.component.html',
  styleUrls: ['./dash-stat.component.scss']
})
export class DashStatComponent implements OnInit, OnDestroy {

  // subscribers
  private dashStatSub: Subscription;

  dashStat: DashStat;

  constructor(private serviceProviderService: ServiceProviderService ) { }

  ngOnInit() {
    this.serviceProviderService.getDashStat();
    this.dashStatSub = this.serviceProviderService.getDashStatUpdatedListener()
          .subscribe((recievedData: DashStat) => {
              this.dashStat = recievedData;
              console.log(this.dashStat);
      });
  }

  ngOnDestroy(){
    if (this.dashStatSub) {
      this.dashStatSub.unsubscribe();
    }
  }

}
