import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Subscription } from 'rxjs';
import { DashboardData } from '../../../admin.model';
@Component({
  selector: 'app-admin-dash-home',
  templateUrl: './admin-dash-home.component.html',
  styleUrls: ['./admin-dash-home.component.scss']
})
export class AdminDashHomeComponent implements OnInit, OnDestroy {

  private dashboarddataSubs: Subscription;

  public dashboardData: DashboardData;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getDashBoardData();
    this.dashboarddataSubs = this.adminService.getDashboardDataUpdateListener().subscribe(
      dashdata => {
        if (dashdata) {
          this.dashboardData = dashdata;
          console.log(this.dashboardData);
       }
      });
  }

  ngOnDestroy() {
    if(this.dashboarddataSubs){
      this.dashboarddataSubs.unsubscribe();
    }

  }



}
