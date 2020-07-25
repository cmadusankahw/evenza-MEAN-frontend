import { Component, OnInit, Input } from '@angular/core';
import { BookingData } from '../../../admin.model';

@Component({
  selector: 'app-admin-pie-chart',
  templateUrl: './admin-pie-chart.component.html',
  styleUrls: ['./admin-pie-chart.component.scss']
})
export class AdminPieChartComponent implements OnInit {


  chartType = 'pie';

  @Input() bookingData: BookingData[];

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0 ], label: 'bookings' }
  ];

  public chartLabels: Array<any> = ['Pending Bookings', 'Completed Bookings', 'Cancelled Bookings'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };


  constructor() { }

  ngOnInit() {
    this.chartDatasets[0].data = [this.bookingData[0].pending ,
    this.bookingData[0].completed ,
    this.bookingData[0].cancelled ];
  }

}
