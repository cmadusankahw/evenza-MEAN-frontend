import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Earnings {
  id: string;
  booking_id: string;
  service_booked: string;
  cust_name: string;
  earned_date: string;
  earned_time: string;
  comments: string;
  appointment: boolean;
  commission_due: number;
  net_earning: number;
}

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'service_booked', 'earned_date_time', 'amount', 'action'];
  dataSource: MatTableDataSource<Earnings>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //view info
  moreinfo = false;

  earnings : Earnings[] = [
    { id: 'E-01', booking_id: 'B-01', service_booked: 'Dream Photography', 
    cust_name: 'Arjun', earned_date: '27/03/2020', earned_time: '13:55',
    comments: 'need a good service', appointment: true, commission_due: 5.0, net_earning: 22.5 },
    { id: 'E-02', booking_id: 'B-02', service_booked: 'Manjula Dressing', 
    cust_name: 'Nimal', earned_date: '27/03/2020', earned_time: '13:55',
    comments: 'need a good service', appointment: true, commission_due: 5.0, net_earning: 22.5 },
    { id: 'E-03', booking_id: 'B-03', service_booked: 'Dream Photography', 
    cust_name: 'Herath', earned_date: '27/03/2020', earned_time: '13:55',
    comments: 'need a good service', appointment: true, commission_due: 5.0, net_earning: 22.5 },
  ];

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.earnings);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
