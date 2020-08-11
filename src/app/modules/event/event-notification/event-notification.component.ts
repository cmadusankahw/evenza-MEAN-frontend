import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Alert, ScheduleAlert } from '../event.model';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-notification',
  templateUrl: './event-notification.component.html',
  styleUrls: ['./event-notification.component.scss']
})
export class EventNotificationComponent implements OnInit, OnDestroy {

  private alertSub: Subscription;

  @Input() public eventId: string;

  @Input() public eventName: string;


  public alerts: ScheduleAlert[] = [];

  constructor(private eventService: EventService) { }

  // filter recieving alerts
  public filterAlerts(alert: any) {
    this.alerts = this.alerts.filter(obj => obj !== alert);
  }

  ngOnInit() {
    if (this.eventId) {
      this.eventService.getAlerts(this.eventId);
      this.alertSub = this.eventService.getalertsUpdatedListener()
        .subscribe((alerts: ScheduleAlert[]) => {
          console.log(alerts);
          this.alerts = alerts;
        });
    }
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }


}
