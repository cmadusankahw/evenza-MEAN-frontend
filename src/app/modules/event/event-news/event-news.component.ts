import { Component, OnInit } from '@angular/core';

export interface Event {
  event_id: string;
  event_title: string;
  type: string;
  description: string;
  organizer: string;
  date: string;
  no_of_days: number;
  start_time: string;
  end_time: string;
  feature_img: string;
  features: any;
}

@Component({
  selector: 'app-event-news',
  templateUrl: './event-news.component.html',
  styleUrls: ['./event-news.component.scss']
})
export class EventNewsComponent implements OnInit {

  events: Event [] = [
    {
      event_id: 'E-01', event_title: 'Saman Wedding', type: 'closed', description: 'Saman & Kamala Wedding Ceremony',
      organizer: ' Saman Kumara', date: '04/07/2020', no_of_days: 1, start_time: '09:00', end_time: '16:00',
      feature_img: './assets/images/events/1.jpg', features: ['Lunch', 'Evening Tea']
    },
    {
      event_id: 'E-02', event_title: 'AI Hackathon', type: 'closed', description: 'Global AI Hackathon',
      organizer: ' Chiran HW', date: '04/22/2020', no_of_days: 1, start_time: '16:00', end_time: '00:00',
      feature_img: './assets/images/events/2.jpg', features: ['T-shirt', 'Lunch', 'Swags']
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
