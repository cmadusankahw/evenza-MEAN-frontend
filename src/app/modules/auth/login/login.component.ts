import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { User, LogIn } from '../auth.model';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  // show alert on login failed
  public showAlert = false;
  // recieving user list to check
  public recievedUsers: User;

  constructor(private http: HttpClient,
              public authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // login form validation
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

  }

  // get form elements
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  loginUser() {
    if (this.email.invalid || this.password.invalid) {
      console.log('form invalid');
      this.dialog.open(ErrorComponent, { data: { message: 'Incorrect Username or Password' } });
    } else {
      this.showAlert = false;
      const login: LogIn = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };
      console.log(login);
      this.authService.signIn(login);
    }
  }



}
