import { Component, OnInit, Input } from '@angular/core';
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
  url1 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=5e89b415-bf1a-4e54-abd5-024a5f02a1ba&autoRefresh=3600&theme=light";
  url2 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=75cfc6f0-57b8-4ad2-b7e5-72df88ac6ad0&autoRefresh=3600&theme=light";
  url3 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=1d040f79-7e45-414f-8c1d-b4711372532e&autoRefresh=3600&theme=light";
  url4 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=e8fa2a00-9749-4cc2-adbe-c7a91295115f&autoRefresh=3600&theme=light";

  url5 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=2b2c3225-86b3-4c0e-8ff4-64561a9b887c&autoRefresh=3600&theme=light";
  url6 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=0ec37da2-e045-49ce-b70a-c1ad4eda93c1&autoRefresh=3600&theme=light";

  url7 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=cd5edd28-623f-4911-8b8a-8efb03382df5&autoRefresh=3600&theme=light";
  url8 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=d6f01845-17d7-41d7-947e-9e8ccf182313&autoRefresh=3600&theme=light";

  constructor(private plannerService: EventPlannerService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.plannerService.getId();
    this.plannerService.getIdUpdatedListener()
      .subscribe( (data) => {
        this.id = data;
      });
  }

  public UserFilter(url: string) {
    const queryString = '&filter={"host.user_id":"' + this.id + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }



}
