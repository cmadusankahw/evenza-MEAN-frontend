import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bookings-graph',
  templateUrl: './bookings-graph.component.html',
  styleUrls: ['./bookings-graph.component.scss']
})
export class BookingsGraphComponent implements OnInit {

  @Input() bookingMonths = {jan:0, feb: 0 ,mar:0, apr: 0, may:0, jun: 0, jul: 0, aug:0 ,sep:0, oct:0, nov:0, dec:0};

  @Input() appointMonths = {jan:0, feb: 0 ,mar:0, apr: 0, may:0, jun: 0, jul: 0, aug:0 ,sep:0, oct:0, nov:0, dec:0};

  public chartType = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Bookings' },
    { data: [], label: 'Appointments' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };


  constructor() { }

  ngOnInit() {

  }


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


}
