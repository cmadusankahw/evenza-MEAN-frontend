import { Component, OnInit } from '@angular/core';

export interface Business {
  id: string;
  title: string;
  description: string;
  email: string;
  contact_no: string;
  address: string;
  location: string;
  isverified: boolean;
  isopened: boolean;
  feature_img: string;
  logo: string;
}
@Component({
  selector: 'app-bprofile',
  templateUrl: './bprofile.component.html',
  styleUrls: ['./bprofile.component.scss']
})
export class BprofileComponent implements OnInit {

  //edit profile mode
  editmode = false;

  //create new profile mode
  addnew = false;

  //business verification
  isverified = false;

  //enabling ctomization
  isowner = true;

  //bprofile data binding
  business: Business = [
    {id: '1', title: 'Chiran \'s Business', }
  ];

  constructor() { }

  ngOnInit() {
  }

}
