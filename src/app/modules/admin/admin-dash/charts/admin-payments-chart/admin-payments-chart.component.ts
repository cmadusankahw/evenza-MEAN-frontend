import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PaymentData, getLastSixMonths } from '../../../admin.model';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-admin-payments-chart',
  templateUrl: './admin-payments-chart.component.html',
  styleUrls: ['./admin-payments-chart.component.scss']
})
export class AdminPaymentsChartComponent implements OnInit, OnDestroy {

  private paymentDataSub : Subscription;

  @Input() paymentData: PaymentData[] = [];

  public chartType: string = 'bar';

public chartDatasets: Array<any> = [
  { data: [65, 59, -157, 81, 56, 55, 40], label: 'Sales & Orders' },
  { data: [11, 12, -157, 13, 14, 15, 16], label: 'Service Bookings' },
];

public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    },
    {
      backgroundColor: [
        'rgba(255, 125, 158, 0.2)',
        'rgba(3, 111, 184, 0.2)',
        'rgba(255, 255, 137, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(126, 243, 243, 0.2)',
        'rgba(255, 210, 115, 0.2)'
      ],
      borderColor: [
        'rgba(255, 125, 158, 1)',
        'rgba(3, 111, 184, 1)',
        'rgba(255, 255, 137, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(126, 243, 243, 1)',
        'rgba(255, 210, 115, 1)'
      ],
      borderWidth: 2,
    },
    ];

    public chartOptions: any = {
      responsive: true,
        scales: {
          xAxes: [{
            stacked: true
            }],
          yAxes: [
          {
            stacked: true
          }
        ]
      }
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

  constructor( private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getDashBoardData();
    this.paymentDataSub = this.adminService.getPaymentDataUpdateListener().subscribe(
      dashdata => {
        if (dashdata) {
          this.paymentData = dashdata;
          console.log(this.paymentData);
       }
      });

    this.chartLabels =  getLastSixMonths(new Date());
  }

  ngOnDestroy() {
    if(this.paymentDataSub){
      this.paymentDataSub.unsubscribe();
    }

  }


}
