import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-dash-home',
  templateUrl: './seller-dash-home.component.html',
  styleUrls: ['./seller-dash-home.component.scss']
})
export class SellerDashHomeComponent implements OnInit {

  // dash stat
  orderCounts = {
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0 ,
    totalInventory: 0,
    pendingOrderDate: '',
    completedOrderDate: '',
    cancelledOrderDate: '',
    inventoryUpdatedDate: ''
  };


  constructor() { }

  ngOnInit() {
  }

  setCounts(event) {
    this.orderCounts = event;
    console.log(this.orderCounts);
  }


}
