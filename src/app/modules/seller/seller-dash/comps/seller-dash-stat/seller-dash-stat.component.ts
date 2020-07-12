import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seller-dash-stat',
  templateUrl: './seller-dash-stat.component.html',
  styleUrls: ['./seller-dash-stat.component.scss']
})
export class SellerDashStatComponent implements OnInit {

  @Input() orderCounts = {
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

}
