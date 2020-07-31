import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TheEvent, Participant } from '../event.model';
import { Alert } from '../event.model';
import { NgForm } from '@angular/forms';
import { pid } from 'process';
import { printData } from '../../eventplanner/eventplanner.model';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.scss']
})
export class EventParticipantsComponent implements OnInit, OnDestroy {

  // subscriptions
  private eventSub: Subscription;

  event: TheEvent;

  eventId: string;

  // invitation message temp
  message: string = 'Start editing your invitation';

  // modified invitation
  invitation: Alert;

  // edit invitation
  invitationEditMode = false;

  // event participants
  participants: Participant[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
    this.eventId =  route.snapshot.params.id;
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

  ngOnDestroy(){
    if (this.eventSub){
      this.eventSub.unsubscribe();
    }
    // this.updateAll(this.participants, this.invitation, this.eventId);
  }

  // add a participant only to local memory
  addParticipant(pForm: NgForm) {
    if (pForm.invalid){
      console.log(' Invalid Participant details');
    }
    const participant: Participant = {
      participant_id: pForm.value.first_name.trim().replace('_','') + (Math.floor(Math.random() * 100) + 1).toString(),
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

  updateInvitation(){
    this.invitation.message = this.message;
    this.invitationEditMode = false;
  }

  // update all chanes at event destroy
  updateAll(participants: Participant[], invitation: Alert, eventId: string) {
    this.eventService.updateParticipantChanges(participants, invitation, eventId);
  }

  // print guest list
  printGuestList(content: string, type: string){
    printData(content, type);
  }

}
