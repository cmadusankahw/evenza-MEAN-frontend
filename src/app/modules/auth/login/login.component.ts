import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventPlanner, Merchant, User, LogIn } from '../auth.model';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // temp login check value
  loginPassed = false;
  showAlert = false;

  // loggedinuser
  signedMerchant: Merchant;
  signedEventPlanner: EventPlanner;

  // recieving user list to check
  recievedUsers: User[];

  constructor(private router: Router, private http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loginUser(loginform) {
    if (this.loginForm.invalid) {

      this.showAlert = true;
      console.log('form invalid');

    } else {
      this.showAlert = false;

      const logIn = {
        email: loginform.value.email,
        password: loginform.value.password
      };

      // log in check
      this.authService.signIn(logIn); // need a promise

      // login action
      if (this.authService.getLogin()) {
        console.log('login successfull!');
        // login successfull code here

      } else {
        this.showAlert = true;
        console.log('login unsuccessfull!');
      }
    }
  }



}
