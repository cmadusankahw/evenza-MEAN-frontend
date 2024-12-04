import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() recievedTask: Task;

  // exporting business location data
  @Output() taskEmmit = new EventEmitter<Task>();

  // created task
  start = this.today;
  end = this.today;
  @Input() eventId: string;
  fromTime = { hour: this.today.getHours(), minute: this.today.getMinutes() };
  toTime = { hour: this.today.getHours(), minute: this.today.getMinutes() };
  title = 'New Task';
  description = '';
  taskId = '';

  // edit task mode
  @Input() updateMode = false;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    if (this.recievedTask) {
      this.title = this.recievedTask.title;
      this.description = this.recievedTask.description;
      this.taskId = this.recievedTask.task_id;
    }
  }
  // create a new task
  createTask() {
    const task: Task = {
      task_id: 'task_' + this.title.toLowerCase().replace(' ', '_') + '_' + Math.floor(Math.random() * 1000).toString(),
      title: this.title,
      description: this.description,
      scheduled_from_date: refactorDate(this.start, this.fromTime),
      scheduled_to_date: refactorDate(this.end, this.toTime),
      state: 'pending',
    };
    this.eventService.createTask(task, this.eventId); // generate task id and segment id from backend
  }

  // send update task details to the parent for updating
  updateTask() {
    const task: Task = {
      task_id: this.recievedTask.task_id,
      title: this.title,
      description: this.description,
      scheduled_from_date: this.recievedTask.scheduled_from_date,
      scheduled_to_date: this.recievedTask.scheduled_to_date,
      state: 'pending',
    };
    this.taskEmmit.emit(task);
    console.log(task);
  }



}
