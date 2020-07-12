import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CardDetails } from '../auth.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  @Output() cardDetailsEmit = new EventEmitter<CardDetails>();

  @Input() carddetails: CardDetails;

  constructor() { }

  ngOnInit() {

  }

   // send business verify details
   updateCardDetails() {
    this.cardDetailsEmit.emit(this.carddetails);
    console.log(this.carddetails);
  }


}
