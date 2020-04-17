import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  //temp login check value
  login = false;
  showAlert = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  loginUser() {
    if (this.loginForm.invalid) {
      console.log('Form Invalid');
    } else {
      console.log('Signin Successfull!');
      if (this.login) {
        this.router.navigate(['/sp/dash']);
        this.showAlert = false;
      } else {
        this.showAlert = true;
      }
    }
  }



}
