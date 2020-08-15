import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { EventPlanner, MerchantTemp } from '../auth.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  private lastIdSub: Subscription;

  signupForm: FormGroup;

  // user type
  userType: boolean;

  // last user Id
  private lastid: string;

  constructor(private router: Router,
              public datepipe: DatePipe,
              public authService: AuthService) { }

  ngOnInit() {
    // signup form validators
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*\d).{7,}$')]),
      contactno: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });

    // get user type
    this.userType = this.authService.getUserType();
    console.log(this.userType);

    // get last user id
    this.authService.getLastUserId();
    this.lastIdSub = this.authService.getLastIdUpdateListener()
      .subscribe((lastId: string) => {
        this.lastid = lastId;
        console.log(this.lastid);
      });

    // router scroll
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  }

  ngOnDestroy() {
    if (this.lastIdSub) {
      this.lastIdSub.unsubscribe();
    }
  }

  // get form elements for validation
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get contactno() { return this.signupForm.get('contactno'); }


  // signup user
  signupUser() {
    if (this.firstName.invalid || this.lastName.invalid || this.email.invalid || this.password.invalid || this.contactno.invalid) {
      console.log('Form Invalid');
      alert('Please check errors before continue!');
    } else {

      if (this.userType) {
        const merchantTemp: MerchantTemp = {
          user_id: this.lastid,
          first_name: this.signupForm.get('firstName').value,
          last_name: this.signupForm.get('lastName').value,
          email: this.signupForm.get('email').value,
          password: this.signupForm.get('password').value,
          contact_no: this.signupForm.get('contactno').value,
          reg_date: new Date().toISOString()
        };
        this.authService.setMerchantTemp(merchantTemp);
        console.log('merchant temp data sent!');
        this.router.navigate(['/register/merchant']);

      } else {
        const eventPlanner: EventPlanner = {
          user_id: this.lastid,
          first_name: this.signupForm.get('firstName').value,
          last_name: this.signupForm.get('lastName').value,
          profile_pic: './assets/images/merchant/nopic.png',
          email: this.signupForm.get('email').value,
          contact_no: this.signupForm.get('contactno').value,
          address_line1: '',
          address_line2: '',
          postal_code: '',
          gender: 'none',
          date_of_birth: '',
          reg_date: new Date().toISOString()
        };
        console.log(eventPlanner);
        this.authService.addEventPlanner(eventPlanner, this.signupForm.get('password').value);
        this.router.navigate(['/']);
      }
    }
  }

  convertDate() {
    const date = new Date();
    return this.datepipe.transform(date, 'dd/MM/yyyy').toString();
  }

}
