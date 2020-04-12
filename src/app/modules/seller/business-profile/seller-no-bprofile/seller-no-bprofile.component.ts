import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seller-no-bprofile',
  templateUrl: './seller-no-bprofile.component.html',
  styleUrls: ['./seller-no-bprofile.component.scss']
})
export class SellerNoBprofileComponent implements OnInit {


  @Input() idverified;

  //create business profile
  editmode = false;

  constructor() { }

  ngOnInit() {
  }

}
