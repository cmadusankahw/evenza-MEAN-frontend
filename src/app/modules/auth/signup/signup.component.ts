import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {EventPlanner} from '../auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  routerVal = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }



  simpleNavigate(routeVal) {
    if (routeVal) {
      alert('User signed Up successfully!');
    } else {
      this.router.navigate(['/register/merchant']);
    }
  }

}
