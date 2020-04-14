import { Component, OnInit, Input } from '@angular/core';

import { Business } from '../../serviceprovider.model';

@Component({
  selector: 'app-bprofile',
  templateUrl: './bprofile.component.html',
  styleUrls: ['./bprofile.component.scss']
})
export class BprofileComponent implements OnInit {

  @Input() isowner;

  //edit profile mode
  editmode = false;

  //create new profile mode
  addnew = false;

   //business-open-days edit mode
   opendaysEditable = false;



  business: Business[] = [
    {
      id: '1',
      merchant_type: 'service_provider',
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
      payment_verified: false,
      feature_img: './assets/images/back/bprofile.jpg',
      logo: './assets/images/merchant/business.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.isowner);
  }

}
