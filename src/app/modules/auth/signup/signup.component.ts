import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventPlanner } from '../auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;


  constructor(private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*\d).{7,}$')]),
      contactno: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }


  //get form elements for validation
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get contactno() { return this.signupForm.get('contactno'); }


  //signup form submit
  signupUser() {
    if (this.signupForm.invalid) {
      console.log('Form Invalid');
      alert('Form has errors! Please check');
    } else {
      console.log('Signup Successfull!');
      this.router.navigate(['/register/merchant']);
    }
  }

}
