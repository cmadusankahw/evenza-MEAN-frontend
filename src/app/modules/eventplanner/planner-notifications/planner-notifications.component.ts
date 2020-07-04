import { Component, OnInit } from '@angular/core';

import { Alert } from '../eventplanner.model';

@Component({
  selector: 'app-planner-notifications',
  templateUrl: './planner-notifications.component.html',
  styleUrls: ['./planner-notifications.component.scss']
})
export class PlannerNotificationsComponent implements OnInit {

  alerts: Alert[] = [
    {id: '1', heading: 'Book Reservation Hall ', message: 'Test alert 1', date: '17/05/2020', state: 'warning'},
    {id: '2', heading: 'Hire Photographer ', message: 'Test alert 2', date: '17/05/2020', state: 'danger'}
  ];

  constructor() { }

  filterAlerts(alert: any ){
    this.alerts = this.alerts.filter(obj => obj !== alert);
  }

  ngOnInit() {

  }

}
