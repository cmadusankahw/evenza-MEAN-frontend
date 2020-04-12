import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface Earnings {
  id: string;
  order_id: string;
  product: string;
  quantity: number;
  cust_name: string;
  earned_date: string;
  earned_time: string;
  comments: string;
  pay_type: string;
  commission_due: number;
  net_earning: number;
}

@Component({
  selector: 'app-seller-earnings',
  templateUrl: './seller-earnings.component.html',
  styleUrls: ['./seller-earnings.component.scss']
})
export class SellerEarningsComponent implements OnInit {


  displayedColumns: string[] = ['id', 'service_booked', 'earned_date_time', 'amount', 'action'];
  dataSource: MatTableDataSource<Earnings>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //view info
  moreinfo = false;

  earnings: Earnings[] = [
    {
      id: 'E-01', order_id: 'P-01', product: 'Wedding SettyBack', quantity: 1,
      cust_name: 'Arjun', earned_date: '27/03/2020', earned_time: '13:55',
      comments: 'need a good service', pay_type: 'On Delivery', commission_due: 5.0, net_earning: 22.5
    },
    {
      id: 'E-02', order_id: 'P-02', product: 'Manjula Lunch Packs', quantity: 200,
      cust_name: 'Nimal', earned_date: '27/03/2020', earned_time: '13:55',
      comments: 'need a good service', pay_type: 'Visa', commission_due: 5.0, net_earning: 22.5
    },
    {
      id: 'E-03', order_id: 'P-03', product: 'High Tea', quantity: 180,
      cust_name: 'Herath', earned_date: '27/03/2020', earned_time: '13:55',
      comments: 'need a good service', pay_type: 'PayHere', commission_due: 5.0, net_earning: 22.5
    },
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
