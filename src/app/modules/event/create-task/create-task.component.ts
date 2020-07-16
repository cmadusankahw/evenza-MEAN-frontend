import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { refactorDate, Task } from '../event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  // current date and time
  today = new Date();

  // created task
  @Input() start = this.today;
  @Input() end = this.today;
  @Input() eventId: string;
  fromTime = {hour: this.today.getHours(), minute: this.today.getMinutes()};
  toTime = {hour: this.today.getHours(), minute: this.today.getMinutes()};
  title = 'New Task';
  description = '';

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }
  // create a new task
  createTask() {
    const task: Task = {
        task_id: 'task_' + this.title.toLowerCase().replace(' ', '_') + '_' +  Math.floor(Math.random() * 1000).toString(),
        title: this.title,
        description: this.description,
        scheduled_from_date: refactorDate(this.start, this.fromTime),
        scheduled_to_date: refactorDate(this.end, this.toTime),
        state: 'pending',
    };
    this.eventService.createTask(task, this.eventId); // generate task id and segment id from backend
    setTimeout (() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/planner/event/schedule/{{event.event_id}}']);
    }, 1000);
    }

}
