import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {Merchant, MerchantTemp } from '../auth.model';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup-merchant',
  templateUrl: './signup-merchant.component.html',
  styleUrls: ['./signup-merchant.component.scss']
})
export class SignupMerchantComponent implements OnInit, OnDestroy {


  // registered merchant
  merchantTemp: MerchantTemp;



  constructor(private router: Router,
              public datepipe: DatePipe,
              public authService: AuthService) { }

  ngOnInit() {
    // get merchant temp
    this.merchantTemp = this.authService.getMerchantTemp();

    // router scroll
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  ngOnDestroy() {
  }

  // signup user
  signupUser(signupForm: NgForm) {
    if (signupForm.invalid) {
      console.log('Form Invalid');
    } else {

      const merchant: Merchant = {
          user_id: this.merchantTemp.user_id,
          user_type: signupForm.value.user_type,
          first_name: this.merchantTemp.first_name,
          last_name: this.merchantTemp.last_name,
          nic: signupForm.value.nic,
          profile_pic: './assets/images/merchant/nopic.png',
          email: this.merchantTemp.email,
          contact_no: this.merchantTemp.contact_no,
          address_line1:  signupForm.value.address1,
          address_line2: signupForm.value.address2,
          postal_code: signupForm.value.postalCode,
          gender: signupForm.value.gender,
          date_of_birth: signupForm.value.birthday,  // check
          id_verification: {isverified: false, id_sideA: null, id_sideB: null, issuer: null},
          reg_date: this.merchantTemp.reg_date,
          business: null
        };
      console.log(merchant);
      this.authService.addMerchant(merchant, this.merchantTemp.password);
      signupForm.resetForm();
      this.router.navigate(['/']);
    }
  }



}
