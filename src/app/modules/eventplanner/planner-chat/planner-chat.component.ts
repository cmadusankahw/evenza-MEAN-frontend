import { Component, OnInit, Input } from '@angular/core';
import { EventPlannerService } from '../eventplanner.service';


@Component({
  selector: 'app-planner-chat',
  templateUrl: './planner-chat.component.html',
  styleUrls: ['./planner-chat.component.scss']
})
export class PlannerChatComponent implements OnInit {

  newMessage: string;
  messageList:  string[] = [];

  @Input() merchantId: string = 'SP2';

  constructor(private eventPlannerService: EventPlannerService) { }

  sendMessage() {
    this.eventPlannerService.sendMessage( this.newMessage );
    this.newMessage = '';
  }

  ngOnInit() {
    this.eventPlannerService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }

}
