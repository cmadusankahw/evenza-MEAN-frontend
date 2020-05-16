import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Merchant } from '../serviceprovider.model';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.scss']
})
export class MerchantProfileComponent implements OnInit {

  // edit profile mode
  editmode = false;

  // user password
  password = 'abcd1234';

  // enabling ctomization
  @Input() isowner;

  // bprofile data binding
  serviceProvider: Merchant[] = [
    {
      user_id: 'U-01',
      user_type: 'SP',
      first_name: 'Chiran',
      last_name: 'Hewawitharana',
      nic: '951991635V',
      profile_pic: './assets/images/merchant/user.jpg',
      email: 'cmadusankahw@gmail.com',
      contact_no: '0711234567',
      address_line1: 'Chiran s Business, No 155',
      address_line2: 'Athtthudawa, Palatuwa',
      postal_code: '81000',
      gender: 'Male',
      date_of_birth: '07/17/1995',
      isverified: false,
      reg_date: '03/22/2020'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

  // string to date function
  convertDate(dob) {
    const m = Number(dob.slice(0, 2)) - 1;
    const d = Number(dob.slice(3, 5));
    const y = Number(dob.slice(6, 10));
    const date = new Date(y, m, d);
    return date;
  }

}
