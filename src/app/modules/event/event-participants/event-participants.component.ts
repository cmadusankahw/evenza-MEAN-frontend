import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TheEvent, Participant } from '../event.model';
import { Alert } from '../event.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.scss']
})
export class EventParticipantsComponent implements OnInit, OnDestroy {

  // subscriptions
  private eventSub: Subscription;

  eventId: string;

  event: TheEvent;

  invitation: Alert = {
    id: 'temp',
    heading: 'Create an Event Now!',
    message:'<h5><b>Add your event details here</b></h5>',
    created_date:'',
    attachments:[],
    state:'pending',
    type:'invitation'
  }; // dummy content for data binding

  // edit invitation
  invitationEditMode = false;

  // event participants
  approvedParticipants: Participant[] = [];
  invitedParticipants: Participant[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
    this.eventId =  route.snapshot.params.id;
  }

  ngOnInit() {
    // get selected event details
    this.eventService.getEvent(this.eventId);
    this.eventSub = this.eventService.getEventUpdatedListener()
      .subscribe((recievedData: TheEvent) => {
      this.event = recievedData;
      if (recievedData.alerts.length){
        this.invitation = recievedData.alerts[0];
        this.event.qr_code = 'chiran qr';
      }
    });
  }

  ngOnDestroy(){
    if (this.eventSub){
      this.eventSub.unsubscribe();
    }
  }

  // add a participant only to local memory
  addParticipant(pForm: NgForm) {
    if (pForm.invalid){
      console.log(' Invalid Participant details');
    }
    const participant: Participant = {
      participant_id: pForm.value.first_name + '_' + pForm.value.email + '_' + Math.random().toString(),
      first_name: pForm.value.first_name,
      last_name: pForm.value.last_name,
      email: pForm.value.email,
      state: 'pending'
    };
    this.event.participants.participants.push(participant);
  }

  // remove participant from the local menory
  removeParticipant(pId: string) {
    // only if state is not-invited
  }

  sendInvitation(eventId: string, participantId: string) {
    // this.invitation
    // send an invitation to selected participant
  }

  updateInvitation() {

    // event: this.event
    // update or create invitation
    // get content -> invitation String of the event
    // event.state should be changed to 'unpublished'
  }

  sendUpdate(eventId: string) {
    // this.invitation
    // send update to all the participants
  }

}
