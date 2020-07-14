import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventSegment } from '../event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }
  // create a new task
  createTask(title: string, description: string, start: string, end: string, eventId: string ) {
    const segment: EventSegment = {
      segment_id: 'segment_' + title.toLowerCase().replace(' ', '_') + '_' +  Math.floor(Math.random() * 1000).toString(),
      segment_type: 'task',
      segment_title: title,
      allocated_budget:0,
      sceduled_from_date: start,
      scheduled_to_date: end,
      spent_budget: 0,
      state: 'pending',
      object: {
        task_id: 'task_' + title.toLowerCase().replace(' ', '_') + '_' +  Math.floor(Math.random() * 1000).toString(),
        title,
        description
      }
    };
    this.eventService.createTask(segment, eventId); // generate task id and segment id from backend
    setTimeout (() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/planner/event/schedule/{{event.event_id}}']);
    }, 1000);
    }


}
