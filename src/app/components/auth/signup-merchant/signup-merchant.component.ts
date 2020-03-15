import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup-merchant',
  templateUrl: './signup-merchant.component.html',
  styleUrls: ['./signup-merchant.component.scss']
})
export class SignupMerchantComponent implements OnInit {


  constructor() { }



  ngOnInit() {


  }

}
