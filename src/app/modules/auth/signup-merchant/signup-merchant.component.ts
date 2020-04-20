import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import {Merchant, Gender, MerchantTemp } from '../auth.model';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup-merchant',
  templateUrl: './signup-merchant.component.html',
  styleUrls: ['./signup-merchant.component.scss']
})
export class SignupMerchantComponent implements OnInit, OnDestroy {

  todayDate: string;

  //registered merchant
  merchantTemp: MerchantTemp[] = [];

  private merchantTempSub: Subscription ;

  merchant: Merchant[] = [];

  constructor(private router: Router, public datepipe: DatePipe, public authService: AuthService) { }

  ngOnInit() {
    this.convertDate();
    this.merchantTemp = this.authService.getMerchantTemp();
    this.merchantTempSub = this.authService.getMerchantTempUpdateListener()
    .subscribe((merchantTemps: MerchantTemp[]) => {
      this.merchantTemp = merchantTemps;
    });
    console.log(this.merchantTemp);
  }

  ngOnDestroy() {
    //unsubscribe dta of the array when comp destroy to prevent memory leaks
    this.merchantTempSub.unsubscribe();
  }

  //signup form submit
  signupUser(signupForm: NgForm) {
    if (signupForm.invalid) {
      console.log('Form Invalid');
    } else {

      const merchant: Merchant = {
          merchant_id: this.merchantTemp[this.merchantTemp.length - 1].merchant_id,
          merchant_type: signupForm.value.merchantSelect,
          first_name: this.merchantTemp[this.merchantTemp.length - 1].first_name,
          last_name: this.merchantTemp[this.merchantTemp.length - 1].last_name,
          nic: signupForm.value.nic,
          profile_pic: null,
          email: this.merchantTemp[this.merchantTemp.length - 1].last_name,
          password: this.merchantTemp[this.merchantTemp.length - 1].last_name,
          contact_no: this.merchantTemp[this.merchantTemp.length - 1].contact_no,
          address_line1:  signupForm.value.address1,
          address_line2: signupForm.value.address2,
          postal_code: signupForm.value.postalCode,
          gender: signupForm.value.gender,
          date_of_birth: signupForm.value.birthday,
          isverified: true,
          reg_date: this.todayDate
        };

      this.authService.addMerchant(merchant);
      console.log(merchant);
      console.log('Signup Successfull!');
      this.router.navigate(['/']);
    }
  }

  convertDate() {
    const date = new Date();
    this.todayDate = this.datepipe.transform( date, 'dd/MM/yyyy').toString();
    console.log(this.todayDate);
  }


}
