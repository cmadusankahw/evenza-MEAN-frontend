import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { EventPlanner, MerchantTemp } from '../auth.model';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  ismerchant: boolean;

  lastMerchantId: string;

  lastEventPlannerId: string;

  constructor(private router: Router, public datepipe: DatePipe, public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*\d).{7,}$')]),
      contactno: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
    this.convertDate();
    this.ismerchant = this.authService.getUserType();
    console.log(this.ismerchant);
    this.lastMerchantId = this.authService.getLastMerchantId();
    this.lastEventPlannerId = this.authService.getLastEventPlannerId();
  }


  // get form elements for validation
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get contactno() { return this.signupForm.get('contactno'); }


  // signup form submit
  signupUser(signupform) {
    if (signupform.invalid) {
      console.log('Form Invalid');
      alert('Form has errors! Please check');
    } else {
      console.log('Signup Successfull!');

      if (this.ismerchant) {
        const mid = 'M' + this.generateMerchantId(this.lastMerchantId).toString();
        const merchantTemp: MerchantTemp = {
          merchant_id: mid,
          first_name: signupform.value.firstName,
          last_name: signupform.value.lastName,
          email: signupform.value.email,
          password: signupform.value.password,
          contact_no: signupform.value.contactno
        };

        this.authService.addMerchantTemp(merchantTemp);
        console.log(merchantTemp);
        console.log('merchant signed up!');
        this.router.navigate(['/register/merchant']);

      } else {
        const uid = 'U' + this.generateEventPlannerId(this.lastEventPlannerId).toString();
        const eventPlanner: EventPlanner = {
          user_id: uid ,
          first_name: signupform.value.firstName,
          last_name: signupform.value.lastName,
          profile_pic: null,
          email: signupform.value.email,
          password: signupform.value.password,
          contact_no: signupform.value.contactno,
          address_line1: null,
          address_line2: null,
          postal_code: null,
          gender: null,
          date_of_birth: null,
          reg_date: this.convertDate()
        };

        this.authService.addEventPlanner(eventPlanner);
        console.log(eventPlanner);
        console.log('user signed up!');
        this.router.navigate(['/']);
      }
    }
  }

  convertDate() {
    const date = new Date();
    return this.datepipe.transform( date, 'dd/MM/yyyy').toString();
  }

  generateMerchantId(merchantId: string) {
      let mId = +(merchantId.slice(1));
      console.log(mId);
      return ++mId;
  }

  generateEventPlannerId(eventPlannerId: string) {
      let eId = +(eventPlannerId.slice(1));
      console.log(eId);
      return ++eId;
  }



}
