import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-bprofile',
  templateUrl: './no-bprofile.component.html',
  styleUrls: ['./no-bprofile.component.scss']
})
export class NoBprofileComponent implements OnInit {

  idverified = true;

  //create business profile
  editmode = false;

  constructor() { }

  ngOnInit() {
  }

}
