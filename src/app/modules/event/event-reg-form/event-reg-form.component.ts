import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { TheEvent, RegistrationForm } from '../event.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-reg-form',
  templateUrl: './event-reg-form.component.html',
  styleUrls: ['./event-reg-form.component.scss']
})
export class EventRegFormComponent implements OnInit, OnDestroy {

  // subscription
  private eventSub: Subscription;
  // recieved event Id
  public eventId: string;
  // received event
  public event: TheEvent;
  // viwer state
  public published = true;

  // event registration form
  public registerForm: RegistrationForm = {
    participant_id: '',
    first_name: '',
    last_name: '',
    email: '',
    contant_no: '',
    state: 'accepted',
    optional_questions: [],
    gender: 'none',
    nic: ''
  }

  constructor(private eventService: EventService, private route: ActivatedRoute) {
    this.eventId = route.snapshot.params.id;
   }

  ngOnInit() {
      // get event
      this.eventService.getEvent(this.eventId);
      this.eventSub = this.eventService.getEventUpdatedListener()
        .subscribe((recievedData: TheEvent) => {
          this.event = recievedData;
        });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }


  // register a participant
  registerParticipant(form: NgForm) {
    if ( form.invalid) {
      console.log(' Form is invalid');
    } else {
      console.log(this.registerForm);
      this.registerForm.participant_id = 'participant_' + new Date().toISOString();
      this.eventService.registerOpenEventParticipant(this.registerForm, this.eventId);
    }

  }

}
