import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup-select',
  templateUrl: './signup-select.component.html',
  styleUrls: ['./signup-select.component.scss']
})
export class SignupSelectComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  navigateUser() {
    this.authService.setUserType(false);
    console.log('eplanner');
  }

  navigateMerchant() {
    this.authService.setUserType(true);
    console.log('merchant');
  }

}
