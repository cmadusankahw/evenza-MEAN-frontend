import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup-select',
  templateUrl: './signup-select.component.html',
  styleUrls: ['./signup-select.component.scss']
})
export class SignupSelectComponent implements OnInit {

  routerVal = true;

  constructor() { }

  ngOnInit() {
  }
  navigateUser() {
    this.routerVal = true;
  }

  navigateMerchant() {
    this.routerVal = false;
  }

}
