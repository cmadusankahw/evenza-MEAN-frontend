import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {Merchant, Gender } from '../auth.model';

@Component({
  selector: 'app-signup-merchant',
  templateUrl: './signup-merchant.component.html',
  styleUrls: ['./signup-merchant.component.scss']
})
export class SignupMerchantComponent implements OnInit {

  @Input() merchantType;


  constructor() { }

  ngOnInit() {


  }

}
