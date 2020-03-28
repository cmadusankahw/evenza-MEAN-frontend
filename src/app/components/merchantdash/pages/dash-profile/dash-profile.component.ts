import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.scss']
})
export class DashProfileComponent implements OnInit {

  //check merchant type
  isSeller = false;

  constructor() { }

  ngOnInit() {
  }

}
