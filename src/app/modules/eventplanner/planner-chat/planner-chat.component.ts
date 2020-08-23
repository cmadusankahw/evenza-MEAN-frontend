import { Component, OnInit, Input } from '@angular/core';
import { EventPlannerService } from '../eventplanner.service';


@Component({
  selector: 'app-planner-chat',
  templateUrl: './planner-chat.component.html',
  styleUrls: ['./planner-chat.component.scss']
})
export class PlannerChatComponent implements OnInit {

  RoomList = ['Service Inquery', 'Product Inquery', 'Evenza Support'];

  usertype = '';
  user: String = 'Anonymous';
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];

  // get into a chat room
  chatMode = false;

  constructor(private _chatService: EventPlannerService) {
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
    if (this._chatService.getUser()) {
      this.usertype = this._chatService.getUser();
    }
    this.defineRoomList();
  }

  defineRoomList() {
    if (this.usertype) {
      if (this.usertype === 'Merchant') {
        this.RoomList = ['Service Inquery', 'Product Inquery'];
      }
      if (this.usertype === 'Support') {
        this.RoomList = ['Evenza Support'];
      }
    }
  }

  join() {
    this._chatService.joinRoom({ user: this.usertype + ' ' + this.user, room: this.room });
  }

  leave() {
    this._chatService.leaveRoom({ user: this.usertype + ' ' + this.user, room: this.room });
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.usertype + ' ' + this.user, room: this.room, message: this.messageText });
  }


}
