import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventPlannerService } from '../../eventplanner.service';

@Component({
  selector: 'app-planner-event-details-report',
  templateUrl: './planner-event-details-report.component.html',
  styleUrls: ['./planner-event-details-report.component.scss']
})
export class PlannerEventDetailsReportComponent implements OnInit {

  // recieved Service Provider ID
  public id: string;

  // Charl URLS
  public url1: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=5e89b415-bf1a-4e54-abd5-024a5f02a1ba&autoRefresh=3600&theme=light';
  public url2: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=75cfc6f0-57b8-4ad2-b7e5-72df88ac6ad0&autoRefresh=3600&theme=light';
  public url3: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=1d040f79-7e45-414f-8c1d-b4711372532e&autoRefresh=3600&theme=light';
  public url4: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=e8fa2a00-9749-4cc2-adbe-c7a91295115f&autoRefresh=3600&theme=light';

  // tslint:disable-next-line: max-line-length
  public url5: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=2b2c3225-86b3-4c0e-8ff4-64561a9b887c&autoRefresh=3600&theme=light';
  public url6: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=0ec37da2-e045-49ce-b70a-c1ad4eda93c1&autoRefresh=3600&theme=light';

  public url7: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=cd5edd28-623f-4911-8b8a-8efb03382df5&autoRefresh=3600&theme=light';
  public url8: any = 'https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=d6f01845-17d7-41d7-947e-9e8ccf182313&autoRefresh=3600&theme=light';

  constructor(private plannerService: EventPlannerService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.plannerService.getId();
    this.plannerService.getIdUpdatedListener()
      .subscribe((data) => {
        this.id = data;
        this.url1 = this.UserFilter(this.url1);
        this.url2 = this.UserFilter(this.url2);
        this.url3 = this.UserFilter(this.url3);
        this.url4 = this.UserFilter(this.url4);
        this.url5 = this.UserFilter(this.url5);
        this.url6 = this.UserFilter(this.url6);
        this.url7 = this.UserFilter(this.url7);
        this.url8 = this.UserFilter(this.url8);
      });
  }

  public UserFilter(url: string) {
    const queryString = '&filter={"host.user_id":"' + this.id + '"}';
    // this.ref.detach();
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);

  }

}
