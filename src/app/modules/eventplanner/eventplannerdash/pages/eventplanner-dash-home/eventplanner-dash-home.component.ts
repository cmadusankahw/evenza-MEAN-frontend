import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventplanner-dash-home',
  templateUrl: './eventplanner-dash-home.component.html',
  styleUrls: ['./eventplanner-dash-home.component.scss']
})
export class EventplannerDashHomeComponent implements OnInit {

  // quick Links list
  quickLinks = [
    {icon: 'calendar', caption: 'View My Events', routerLink: '/planner/events'},
    {icon: 'bookmark', caption: 'View My Bookings', routerLink: '/planner/bookings'},
    {icon: 'list', caption: 'View My Appointments', routerLink: '/planner/appoints'},
    {icon: 'clipboard-list', caption: 'View My Orders', routerLink: '/planner/orders'},
    {icon: 'box-open', caption: 'Search a Product', routerLink: '/products'},
    {icon: 'concierge-bell', caption: 'Search a Service', routerLink: '/services'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
