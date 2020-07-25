import { Component, OnInit, Input } from '@angular/core';
import { OrderData } from '../../../admin.model';

@Component({
  selector: 'app-admin-orders-pie-chart',
  templateUrl: './admin-orders-pie-chart.component.html',
  styleUrls: ['./admin-orders-pie-chart.component.scss']
})
export class AdminOrdersPieChartComponent implements OnInit {

  chartType = 'pie';

  @Input() orderData: OrderData[];

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0 ], label: 'bookings' }
  ];

  public chartLabels: Array<any> = ['Pending Orders', 'Delivered Orders', 'Cancelled Orders'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F5464A', '#56BFBD', '#FAB45C'],
      hoverBackgroundColor: ['#F55A5E', '#7AD3D1', '#FAC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };



  constructor() { }

  ngOnInit() {
    this.chartDatasets[0].data = [this.orderData[0].pending ,
    this.orderData[0].delivered ,
    this.orderData[0].cancelled ];
  }

}
