import { Component, OnInit, Input } from '@angular/core';

import { DashStat } from '../../../seller.model';

@Component({
  selector: 'app-seller-dash-stat',
  templateUrl: './seller-dash-stat.component.html',
  styleUrls: ['./seller-dash-stat.component.scss']
})
export class SellerDashStatComponent implements OnInit {

  @Input() orderCounts = { pendingOrders: 0, completedOrders: 0, cancelledOrders: 0 ,pendingOrderDate: '', completedOrderDate: '', cancelledOrderDate: ''};

  constructor() { }

  ngOnInit() {
  }

}
