import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.scss']
})
export class SalesGraphComponent implements OnInit {

  public chartType = 'line';

  salesData = {
    data: [],
    months: []
  };

  public chartDatasets: Array<any> = [
    { data: this.salesData.data, label: 'Total Sales' }
  ];

  public chartLabels: Array<any> = this.salesData.months;

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
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
