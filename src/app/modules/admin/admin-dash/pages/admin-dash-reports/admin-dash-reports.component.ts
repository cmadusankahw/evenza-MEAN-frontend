import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dash-reports',
  templateUrl: './admin-dash-reports.component.html',
  styleUrls: ['./admin-dash-reports.component.scss']
})
export class AdminDashReportsComponent implements OnInit {

  // recieved locations
  serviceLocations: any[] = [];
  eventLocations: any[] = [];

  constructor(public sanitizer: DomSanitizer,
              private adminService: AdminService) { }

  ngOnInit() {
    // get service provider locations
    this.adminService.getMerchantLocation();
    this.adminService.getMerchantLocationUpdateListener()
      .subscribe( (data) => {
        this.serviceLocations = data;
      });

   // get event locations
    this.adminService.getEventLocation();
    this.adminService.getEventLocationUpdateListener()
      .subscribe( (data) => {
        this.eventLocations = data;
      });
  }

  // filters to be added in future
  public UserFilter(url: string) {
    const queryString = '&filter={"host.user_id":" "}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

}
