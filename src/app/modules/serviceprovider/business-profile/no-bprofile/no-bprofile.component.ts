import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-bprofile',
  templateUrl: './no-bprofile.component.html',
  styleUrls: ['./no-bprofile.component.scss']
})
export class NoBprofileComponent implements OnInit {

  @Input() idverified;

  //create business profile
  editmode = false;

  constructor() { }

  ngOnInit() {
  }

}
