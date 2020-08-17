import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TheEvent, Participant } from '../event.model';
import { Alert } from '../event.model';
import { NgForm } from '@angular/forms';
import { pid } from 'process';
import { printData } from '../../eventplanner/eventplanner.model';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.scss']
})
export class EventParticipantsComponent implements OnInit, OnDestroy {

  // subscriptions
  private eventSub: Subscription;
  // recieved event
  event: TheEvent;
 // recieved event id
  eventId: string;
  // invitation message temp
  message = 'Start editing your invitation';
  // modified invitation
  invitation: Alert;
  // edit invitation
  invitationEditMode = false;
  // event participants
  participants: Participant[] = [];
  // snack bars for notification display
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router,  private _snackBar: MatSnackBar) {
    this.eventId = route.snapshot.params.id;
  }

  ngOnInit() {
    // get selected event details
    this.eventService.getEvent(this.eventId);
    this.eventSub = this.eventService.getEventUpdatedListener()
      .subscribe((recievedData: TheEvent) => {
        this.event = recievedData;
        this.participants = recievedData.participants.participants;
        if (recievedData.alerts[0]) {
          this.invitation = recievedData.alerts[0];
          this.message = recievedData.alerts[0].message;
        }
      });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
    // this.updateAll(this.participants, this.invitation, this.eventId);
  }

  // add a participant only to local memory
  addParticipant(pForm: NgForm) {
    if (pForm.invalid) {
      console.log(' Invalid Participant details');
    }
    const participant: Participant = {
      participant_id: pForm.value.first_name.trim().replace('_', '') + (Math.floor(Math.random() * 100) + 1).toString(),
      first_name: pForm.value.first_name,
      last_name: pForm.value.last_name,
      email: pForm.value.email,
      state: 'pending'
    };
    this.participants.push(participant);
    pForm.resetForm();
  }

  // remove participant from the local menory
  removeParticipant(pId: string) {
    const updatedParticipants = this.participants.filter(t => t.participant_id !== pId);
    this.participants = updatedParticipants;
  }

  updateInvitation() {
    this.invitation.message = this.message;
    this.invitationEditMode = false;
  }

  // update all chanes at event destroy
  updateAll(participants: Participant[], invitation: Alert, eventId: string) {
    this.eventService.updateParticipantChanges(participants, invitation, eventId);
  }

  // print guest list
  printGuestList(content: string, type: string) {
    printData(content, type);
  }

  // copy selected event link to clipboard
  copyMessage(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'http://evenza.biz/events/register/' + this.eventId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._snackBar.open( 'Likn copied to clipboard ', 'Dismiss', {
    duration: 5000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
  }
}
