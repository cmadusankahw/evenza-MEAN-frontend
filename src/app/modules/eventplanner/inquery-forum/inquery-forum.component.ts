import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inquery } from '../eventplanner.model';
import { EventPlannerService } from '../eventplanner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inquery-forum',
  templateUrl: './inquery-forum.component.html',
  styleUrls: ['./inquery-forum.component.scss']
})
export class InqueryForumComponent implements OnInit, OnDestroy {

  // subscription
  private inquerySub: Subscription;

  // created inquery
  inquery: Inquery = {
    id: '',
    heading: 'New Inquery',
    category: '',
    message: ''
  };

  // recieved inquiries
  recievedInquries: Inquery[] = [];

  constructor(private eventPlannerService: EventPlannerService) { }

  ngOnInit() {
    this.eventPlannerService.getInqueries();
    this.inquerySub = this.eventPlannerService.getInqueriesUpdatedListener()
      .subscribe((res: Inquery[]) => {
        this.recievedInquries = res;
        console.log(this.recievedInquries);
      });
  }

  ngOnDestroy() {
    if (this.inquerySub) {
      this.inquerySub.unsubscribe();
    }
  }

  createInquery() {
    this.inquery.id = new Date().toISOString();
    this.eventPlannerService.createInquery(this.inquery);
  }

  removeInquery(inqId: string) {
    this.eventPlannerService.removeInquery(inqId);
  }

}
