import { Component, OnInit } from '@angular/core';

export interface Business {
  id: string;
  title: string;
  description: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
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

  //enabling ctomization
  isowner = true;

  //bprofile data binding
  business: Business[] = [
    {
      id: '1',
      title: 'Chiran \'s Business',
      description: 'sample description of chiran s business',
      email: 'chiran@cbusiness.com',
      contact_no: '0711112233',
      address_line1: 'Main Street',
      address_line2: 'Dalugama, Kelaniya',
      postal_code: '11300',
      location: 'https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed', 
      isverified: false,
      isopened: true,
      feature_img: './assets/images/back/bprofile.jpg',
      logo: './assets/images/merchant/business.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
