import { Component, OnInit } from '@angular/core';


export interface DashStat {
  business_id: string;
  merchant_id: string;
  pending_orders: number;
  last_order_date: string;
  to_delivery_orders: number;
  next_delivery_date: string;
  completed_orders: number;
  last_completed_date: string;
  inventory: number;
  lasT_modified_date: string;
}


@Component({
  selector: 'app-seller-dash-stat',
  templateUrl: './seller-dash-stat.component.html',
  styleUrls: ['./seller-dash-stat.component.scss']
})
export class SellerDashStatComponent implements OnInit {

  dashStat: DashStat[] = [
    {business_id: 'B-01',
    merchant_id: 'M-01',
    pending_orders: 2,
    last_order_date: '22/03/2020',
    to_delivery_orders: 3,
    next_delivery_date: '20/03/2020',
    completed_orders:11,
    last_completed_date: '11/02/2020',
    inventory: 36,
    lasT_modified_date: '13/03/2020'
  },
  ];

  constructor() { }

  ngOnInit() {
  }

}
