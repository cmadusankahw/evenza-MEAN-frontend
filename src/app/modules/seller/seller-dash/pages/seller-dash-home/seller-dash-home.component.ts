import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-dash-home',
  templateUrl: './seller-dash-home.component.html',
  styleUrls: ['./seller-dash-home.component.scss']
})
export class SellerDashHomeComponent implements OnInit {

  orderCounts: any;

  constructor() { }

  ngOnInit() {
  }

  setCounts(event) {
    this.orderCounts = event;
    console.log(this.orderCounts);
  }


}
