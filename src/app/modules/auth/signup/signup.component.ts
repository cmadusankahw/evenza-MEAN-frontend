import { Component, OnInit,  OnDestroy } from '@angular/core';
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
    if (this.lastIdSub){
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
  signupUser(signupform: NgForm) {
    if (signupform.invalid) {
      console.log('Form Invalid');
      alert('Please check errors before continue!');
    } else {

      if (this.userType) {
        const merchantTemp: MerchantTemp = {
          user_id: this.lastid,
          first_name: signupform.value.firstName,
          last_name: signupform.value.lastName,
          email: signupform.value.email,
          password: signupform.value.password,
          contact_no: signupform.value.contactno,
          reg_date: new Date().toISOString()
        };
        this.authService.addMerchantTemp(merchantTemp);
        console.log('merchant temp data sent!');
        this.router.navigate(['/register/merchant']);

      } else {
        const eventPlanner: EventPlanner = {
          user_id: this.lastid,
          first_name: signupform.value.firstName,
          last_name: signupform.value.lastName,
          profile_pic: './assets/images/merchant/nopic.png',
          email: signupform.value.email,
          contact_no: signupform.value.contactno,
          address_line1: '',
          address_line2: '',
          postal_code: '',
          gender: 'none',
          date_of_birth: '',
          reg_date: new Date().toISOString()
        };
        console.log(eventPlanner);
        this.authService.addEventPlanner(eventPlanner, signupform.value.password);
        this.router.navigate(['/']);
      }
      signupform.resetForm();
    }
  }

  convertDate() {
    const date = new Date();
    return this.datepipe.transform( date, 'dd/MM/yyyy').toString();
  }

}
